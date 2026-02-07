import Card from "../../components/ui/Card";
import { useEffect, useMemo, useState } from "react";
import { askDiseaseAI, getDisease } from "../../services/webService";

export default function Disease() {
    const [diseases, setDiseases] = useState([]);
    const [inputText, setInputText] = useState("");
    const [loadingAI, setLoadingAI] = useState(false);
    const [aiResult, setAiResult] = useState(null);

    const fetchDiseases = async () => {
        try {
            const res = await getDisease();
            if (res.EC === 0) setDiseases(res.DT || []);
        } catch (err) {
            console.error("fetchDiseases error:", err);
        }
    };

    useEffect(() => {
        fetchDiseases();
    }, []);

    const visibleDiseases = useMemo(() => {
        if (!aiResult?.matchedDiseaseIds?.length) return diseases;
        const setIds = new Set(aiResult.matchedDiseaseIds);
        return diseases.filter((d) => setIds.has(d._id));
    }, [diseases, aiResult]);

    const onAskAI = async () => {
        try {
            setLoadingAI(true);
            setAiResult(null);

            const res = await askDiseaseAI(inputText);
            if (res.EC === 0) setAiResult(res.DT);
        } catch (err) {
            console.error("askDiseaseAI error:", err);
            setAiResult({
                query: inputText,
                matchedDiseaseIds: [],
                suggestions: [],
                redFlags: [],
                disclaimer: "AI error. Please try again.",
            });
        } finally {
            setLoadingAI(false);
        }
    };

    const onClearAI = () => setAiResult(null);

    return (
        <section className="w-full bg-[#F2F2F2]">
            <div className="mx-auto max-w-5xl px-6 py-20">
                {/* Header */}
                <div className="flex items-center justify-center gap-6">
                    <h2 className="text-5xl font-black tracking-tight text-[#1E1E1E]">
                        Diseases
                    </h2>
                </div>

                {/* ✅ AI bar */}
                <div className="mt-10 rounded-2xl border border-black/10 bg-white p-4 shadow-sm">
                    <div className="flex flex-col gap-3 md:flex-row md:items-center">
                        <input
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            placeholder='Describe symptoms (e.g., "red eye, watery discharge, itchy")'
                            className="w-full rounded-xl border border-black/10 px-4 py-3 text-sm outline-none focus:border-black/30"
                        />

                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={onAskAI}
                                disabled={!inputText.trim() || loadingAI}
                                className="rounded-xl bg-black px-5 py-3 text-sm font-extrabold text-white disabled:opacity-50"
                            >
                                {loadingAI ? "Asking..." : "Ask AI"}
                            </button>

                            {aiResult && (
                                <button
                                    type="button"
                                    onClick={onClearAI}
                                    className="rounded-xl border border-black/10 bg-white px-5 py-3 text-sm font-extrabold hover:bg-black/5"
                                >
                                    Clear
                                </button>
                            )}
                        </div>
                    </div>

                    {/* ✅ AI output */}
                    {aiResult && (
                        <div className="mt-4 rounded-xl bg-[#F2F2F2] p-4">
                            <p className="text-sm font-extrabold text-[#1E1E1E]">
                                AI Suggestions
                            </p>

                            {aiResult.redFlags?.length > 0 && (
                                <div className="mt-3 rounded-xl border border-red-200 bg-red-50 p-3">
                                    <p className="text-sm font-extrabold text-red-900">Red flags</p>
                                    <ul className="mt-2 list-disc pl-5 text-sm text-red-900">
                                        {aiResult.redFlags.map((x, idx) => (
                                            <li key={idx}>{x}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <div className="mt-3">
                                <ul className="space-y-2 text-sm text-[#485E57]">
                                    {(aiResult.suggestions || []).map((s) => (
                                        <li key={s.id} className="leading-6">
                                            <span className="font-extrabold text-[#1E1E1E]">{s.id}:</span>{" "}
                                            {s.why}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <p className="mt-3 text-xs text-[#485E57]">
                                {aiResult.disclaimer || "This is not a diagnosis."}
                            </p>
                        </div>
                    )}
                </div>

                {/* Cards */}
                <div className="mt-14 grid gap-10 md:grid-cols-3">
                    {visibleDiseases.map((item) => (
                        <Card key={item._id} item={item} />
                    ))}
                </div>

                {aiResult?.matchedDiseaseIds?.length === 0 && aiResult && (
                    <p className="mt-8 text-center text-sm text-[#485E57]">
                        No matches found. Try adding more details (discharge type, pain level, contact lens use).
                    </p>
                )}
            </div>
        </section>
    );
}