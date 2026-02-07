import Reservation from "../models/Reservation.js";
import Disease from "../models/Disease.js";
import { suggestDiseasesWithGeminiScored } from "../services/geminiService.js";

function validateReservation(body) {
    const errors = {};
    const nameRegex = /^[A-Za-z\s]+$/;

    const firstName = String(body.firstName ?? "").trim();
    const lastName = String(body.lastName ?? "").trim();
    const phoneNumber = String(body.phoneNumber ?? "").trim();
    const email = String(body.email ?? "").trim();
    const date = String(body.date ?? "").trim();
    const time = String(body.time ?? "").trim();

    if (!firstName) errors.firstName = "First name is required";
    else if (!nameRegex.test(firstName)) errors.firstName = "Only letters and spaces";

    if (!lastName) errors.lastName = "Last name is required";
    else if (!nameRegex.test(lastName)) errors.lastName = "Only letters and spaces";

    if (!phoneNumber) errors.phoneNumber = "Phone number is required";
    else if (!/^[0-9+\-\s()]{7,20}$/.test(phoneNumber)) errors.phoneNumber = "Phone number is invalid";

    if (!email) errors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Email is invalid";

    if (!date) errors.date = "Please choose a date";
    if (!time) errors.time = "Please choose a time";

    return errors;
}

const handleReservation = async (req, res) => {
    try {
        const errors = validateReservation(req.body);
        if (Object.keys(errors).length) {
            return res.status(400).json({ EC: 1, EM: "Validation error", DT: errors });
        }

        const doc = await Reservation.create({
            firstName: String(req.body.firstName).trim(),
            lastName: String(req.body.lastName).trim(),
            phoneNumber: String(req.body.phoneNumber).trim(),
            email: String(req.body.email).trim().toLowerCase(),
            date: String(req.body.date).trim(),
            time: String(req.body.time).trim(),
        });

        return res.status(201).json({ EC: 0, EM: "Created", DT: doc });
    } catch (err) {
        console.error("createReservation error:", err);
        return res.status(500).json({ EC: -1, EM: err.message || "Server error", DT: null });
    }
};

const getDisease = async (req, res) => {
    try {
        const docs = await Disease.find().lean();
        return res.status(200).json({ EC: 0, EM: "OK", DT: docs });
    } catch (err) {
        console.error("getAllDiseases error:", err);
        return res.status(500).json({ EC: -1, EM: "Server error", DT: null });
    }
}

const getHome = (req, res) => {
    try {
        return res.status(200).json({
            EM: "OK",
            EC: 0,
            DT: []
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: error.message || "Can't get home",
            EC: 1,
            DT: []
        });
    }
};


const askDiseaseAI = async (req, res) => {
    try {
        const userText = String(req.body?.text ?? "").trim();
        const topK = Math.max(1, Math.min(Number(req.body?.topK ?? 6), 12));

        if (!userText) {
            return res.status(400).json({ EC: 1, EM: "Text is required", DT: null });
        }

        const diseases = await Disease.find().lean();

        // Gemini scored matching
        const ai = await suggestDiseasesWithGeminiScored({ userText, diseases, topK });

        // Map results -> include full disease objects
        const diseaseMap = new Map(diseases.map((d) => [String(d._id), d]));

        const results = (ai.matches || [])
            .map((m) => {
                const doc = diseaseMap.get(String(m.id));
                if (!doc) return null;
                return {
                    diseaseId: String(m.id),
                    matchPercent: m.matchPercent,
                    why: m.why,
                    disease: doc, // ✅ full data
                };
            })
            .filter(Boolean)
            .sort((a, b) => b.matchPercent - a.matchPercent);

        // Keep backward compatibility for your current FE filter logic:
        const matchedDiseaseIds = results.map((x) => x.diseaseId);

        return res.status(200).json({
            EC: 0,
            EM: "OK",
            DT: {
                query: userText,

                // old fields (so FE won't break)
                matchedDiseaseIds,
                suggestions: results.map((x) => ({ id: x.diseaseId, why: x.why })),

                // new fields (for Match% + sorting)
                results, // [{ diseaseId, matchPercent, why, disease }]

                redFlags: ai.redFlags || [],
                comments: ai.comments || [],
                disclaimer: ai.disclaimer || "This is not a diagnosis.",
            },
        });
    } catch (err) {
        console.error("askDiseaseAI error:", err);
        return res.status(500).json({ EC: -1, EM: err.message || "Server error", DT: null });
    }
};

export {
    getDisease,
    handleReservation,
    getHome,
    askDiseaseAI,
}