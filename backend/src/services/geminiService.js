import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
const modelName = process.env.GEMINI_MODEL || "gemini-flash-latest";

if (!apiKey) {
    console.warn("⚠️ Missing GEMINI_API_KEY in .env");
}

const genAI = new GoogleGenerativeAI(apiKey);

// ---- helper: strict JSON parse fallback ----
function safeJsonParse(raw) {
    try {
        const jsonStart = raw.indexOf("{");
        const jsonEnd = raw.lastIndexOf("}");
        if (jsonStart === -1 || jsonEnd === -1) return null;
        const jsonText = raw.slice(jsonStart, jsonEnd + 1);
        return JSON.parse(jsonText);
    } catch {
        return null;
    }
}

/**
 * Gemini does:
 * - pick best diseases
 * - assign matchPercent 0..100
 * - give short reasoning
 * - detect red flags
 *
 * Return STRICT JSON:
 * {
 *   "matches": [{ "id": "...", "matchPercent": 0-100, "why": "..." }],
 *   "redFlags": ["..."],
 *   "comments": ["..."],
 *   "disclaimer": "..."
 * }
 */
export async function suggestDiseasesWithGeminiScored({ userText, diseases, topK = 6 }) {
    const model = genAI.getGenerativeModel({ model: modelName });

    // send compact disease data to Gemini
    const compact = diseases.map((d) => ({
        _id: d._id,
        name: d.name,
        urgencyBadge: d.urgencyBadge,
        categoryTags: d.categoryTags,
        shortDescription: d.shortDescription,
        aiSearchText: d.aiSearchText,
        discriminators: d.discriminators,
        symptomProfile: d.symptomProfile,
        redFlags: d.redFlags,
    }));

    const prompt = `
You are a medical information assistant for eye-related conditions.
You MUST NOT diagnose. Provide informational matching only.

Goal:
Given user text, choose the most relevant diseases from the provided list and output:
- matches: up to ${topK} items with matchPercent (0..100) and short why
- redFlags: if user text contains dangerous symptoms, list them and recommend urgent care
- comments: 2-4 short helpful comments about what the user described (non-diagnostic)
- disclaimer: one short safety disclaimer

Rules:
- Output STRICT JSON only. No markdown, no extra text.
- matchPercent must be an integer 0..100.
- Use only disease ids from the known list.

JSON schema:
{
  "matches": [
    { "id": "dis_...", "matchPercent": 0, "why": "..." }
  ],
  "redFlags": ["..."],
  "comments": ["..."],
  "disclaimer": "..."
}

User text:
${userText}

Known diseases JSON:
${JSON.stringify(compact)}
`;

    const result = await model.generateContent(prompt);
    const raw = result.response.text();

    const parsed = safeJsonParse(raw);

    // Fallback if Gemini returns invalid JSON
    if (!parsed) {
        return {
            matches: [],
            redFlags: [],
            comments: [],
            disclaimer: "This is not a diagnosis. If symptoms are severe, seek urgent care.",
            _raw: raw,
        };
    }

    // Guardrails: keep only valid ids, clamp percent, max topK
    const validIds = new Set(compact.map((x) => x._id));
    const matches = Array.isArray(parsed.matches) ? parsed.matches : [];

    const cleaned = matches
        .filter((m) => validIds.has(m?.id))
        .map((m) => {
            let p = Number(m.matchPercent);
            if (!Number.isFinite(p)) p = 0;
            p = Math.max(0, Math.min(100, Math.round(p)));
            return {
                id: String(m.id),
                matchPercent: p,
                why: String(m.why ?? "").trim(),
            };
        })
        .sort((a, b) => b.matchPercent - a.matchPercent)
        .slice(0, topK);

    return {
        matches: cleaned,
        redFlags: Array.isArray(parsed.redFlags) ? parsed.redFlags.slice(0, 10) : [],
        comments: Array.isArray(parsed.comments) ? parsed.comments.slice(0, 6) : [],
        disclaimer:
            String(parsed.disclaimer || "").trim() ||
            "This is not a diagnosis. If symptoms are severe, seek urgent care.",
        _raw: raw, // keep for debugging
    };
}