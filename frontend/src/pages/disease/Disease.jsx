import Card from "../../components/ui/Card";
import { useEffect, useMemo, useState } from "react";
import { askDiseaseAI, getDisease } from "../../services/webService";

const PAGE_SIZE = 6;

export default function Disease() {
    const [diseases, setDiseases] = useState([]);
    const [inputText, setInputText] = useState("");
    const [loadingAI, setLoadingAI] = useState(false);
    const [aiResult, setAiResult] = useState(null);

    const [page, setPage] = useState(1);

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

    // Filter
    const visibleDiseases = useMemo(() => {
        if (!aiResult?.matchedDiseaseIds?.length) return diseases;
        const setIds = new Set(aiResult.matchedDiseaseIds);
        return diseases.filter((d) => setIds.has(d._id));
    }, [diseases, aiResult]);

    // ✅ reset page khi filter
    useEffect(() => {
        setPage(1);
    }, [aiResult, diseases.length]);

    // ✅ Pagination calc
    const totalPages = Math.max(1, Math.ceil(visibleDiseases.length / PAGE_SIZE));

    // clamp page nếu data đổi
    useEffect(() => {
        if (page > totalPages) setPage(totalPages);
    }, [page, totalPages]);

    const currentItems = useMemo(() => {
        const start = (page - 1) * PAGE_SIZE;
        return visibleDiseases.slice(start, start + PAGE_SIZE);
    }, [visibleDiseases, page]);

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
                <div className="flex items-center justify-center gap-6">
                    <h2 className="text-5xl font-black tracking-tight text-[#1E1E1E]">Diseases List</h2>
                </div>

                {/* AI bar */}
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

                    {aiResult && (
                        <div className="mt-4 rounded-xl bg-[#F2F2F2] p-4">
                            <p className="text-sm font-extrabold text-[#1E1E1E]">AI Suggestions</p>

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

                            <ul className="mt-3 space-y-2 text-sm text-[#485E57]">
                                {(aiResult.suggestions || []).map((s) => (
                                    <li key={s.id} className="leading-6">
                                        <span className="font-extrabold text-[#1E1E1E]">{s.id}:</span> {s.why}
                                    </li>
                                ))}
                            </ul>

                            <p className="mt-3 text-xs text-[#485E57]">
                                {aiResult.disclaimer || "This is not a diagnosis."}
                            </p>
                        </div>
                    )}
                </div>

                {/* Cards */}
                <div className="mt-14 grid gap-10 md:grid-cols-3">
                    {currentItems.map((item) => (
                        <Card key={item._id} item={item} />
                    ))}
                </div>

                {/* Pagination */}
                <div className="mt-10 flex items-center justify-center gap-3">
                    <button
                        type="button"
                        disabled={page === 1}
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        className="rounded-xl border border-black/10 bg-white px-4 py-2 text-sm font-extrabold disabled:opacity-40 hover:bg-black/5"
                    >
                        Prev
                    </button>

                    {/* Page numbers */}
                    <div className="flex items-center gap-2">
                        {Array.from({ length: totalPages }).map((_, idx) => {
                            const p = idx + 1;
                            const active = p === page;
                            return (
                                <button
                                    key={p}
                                    type="button"
                                    onClick={() => setPage(p)}
                                    className={
                                        active
                                            ? "rounded-xl bg-black px-4 py-2 text-sm font-extrabold text-white"
                                            : "rounded-xl border border-black/10 bg-white px-4 py-2 text-sm font-extrabold hover:bg-black/5"
                                    }
                                >
                                    {p}
                                </button>
                            );
                        })}
                    </div>

                    <button
                        type="button"
                        disabled={page === totalPages}
                        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                        className="rounded-xl border border-black/10 bg-white px-4 py-2 text-sm font-extrabold disabled:opacity-40 hover:bg-black/5"
                    >
                        Next
                    </button>
                </div>

                {/* Optional info */}
                <p className="mt-4 text-center text-xs text-[#485E57]">
                    Showing {(page - 1) * PAGE_SIZE + 1}–
                    {Math.min(page * PAGE_SIZE, visibleDiseases.length)} of {visibleDiseases.length}
                </p>
            </div>
        </section>
    );
}