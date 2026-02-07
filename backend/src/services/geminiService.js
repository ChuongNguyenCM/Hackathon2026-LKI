import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
const modelName = process.env.GEMINI_MODEL || "gemini-flash-latest";

if (!apiKey) {
    console.warn("⚠️ Missing GEMINI_API_KEY in .env");
}

const genAI = new GoogleGenerativeAI(apiKey);

export async function suggestDiseasesWithGemini({ userText, diseases }) {
    const model = genAI.getGenerativeModel({ model: modelName });

    const compact = diseases.map((d) => ({
        _id: d._id,
        name: d.name,
        shortDescription: d.shortDescription,
        urgencyBadge: d.urgencyBadge,
        categoryTags: d.categoryTags,
        aiSearchText: d.aiSearchText,
    }));

    const prompt = `
You are a medical information assistant for eye-related conditions.
You MUST NOT diagnose. You provide informational suggestions only.

Task:
Given the user's text symptoms/concerns and a list of known eye diseases, return:
1) matchedDiseaseIds: up to 6 disease _id values that best match
2) suggestions: short bullets explaining why each matched disease fits (refer to symptoms)
3) redFlags: if the user text includes dangerous symptoms, list them and recommend urgent care
4) disclaimer: short safety disclaimer

Return STRICT JSON only with this schema:
{
  "matchedDiseaseIds": ["..."],
  "suggestions": [
    { "id": "...", "why": "..." }
  ],
  "redFlags": ["..."],
  "disclaimer": "..."
}

User text:
${userText}

Known diseases JSON:
${JSON.stringify(compact)}
`;

    const result = await model.generateContent(prompt);
    const raw = result.response.text();

    // Try parse JSON strictly
    try {
        const jsonStart = raw.indexOf("{");
        const jsonEnd = raw.lastIndexOf("}");
        const jsonText = raw.slice(jsonStart, jsonEnd + 1);
        const parsed = JSON.parse(jsonText);

        // Basic guardrails
        const ids = new Set(compact.map((x) => x._id));
        parsed.matchedDiseaseIds = (parsed.matchedDiseaseIds || []).filter((id) => ids.has(id)).slice(0, 6);

        return parsed;
    } catch (e) {
        return {
            matchedDiseaseIds: [],
            suggestions: [],
            redFlags: [],
            disclaimer: "This is not a diagnosis. If symptoms are severe, seek urgent care.",
            _raw: raw,
        };
    }
}