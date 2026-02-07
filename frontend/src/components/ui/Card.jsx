import { useState } from "react";
import { useNavigate } from "react-router-dom";

const badgeStyles = {
    low: "bg-green-100 text-green-800 border-green-200",
    low_to_medium: "bg-lime-100 text-lime-800 border-lime-200",
    medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
    medium_to_high: "bg-orange-100 text-orange-800 border-orange-200",
    high: "bg-red-100 text-red-800 border-red-200",
    emergency: "bg-red-200 text-red-900 border-red-300",
};

export default function Card({ item }) {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const badgeClass =
        badgeStyles[item?.urgencyBadge] || "bg-gray-100 text-gray-700 border-gray-200";

    const close = () => setOpen(false);
    const openModal = () => setOpen(true);

    const goReservation = () => {
        close();
        navigate("/reservations");
    };

    return (
        <>
            {/* CARD */}
            <button
                type="button"
                className="overflow-hidden rounded-2xl border border-black/10 bg-[#F2F2F2] shadow-lg shadow-black/15 transition-transform duration-300 ease-out hover:scale-105 hover:shadow-xl text-left w-full"
                onClick={openModal}
            >
                <div className="p-5">
                    <div className="overflow-hidden rounded-xl border border-black/15 bg-white">
                        <img
                            src={item?.thumbnailUrl}
                            alt={item?.name}
                            className="aspect-[4/3] w-full object-cover"
                            loading="lazy"
                        />
                    </div>

                    <div className="mt-6 flex items-start justify-between gap-3">
                        <h3 className="text-xl font-extrabold text-[#1E1E1E] leading-snug">
                            {item?.name}
                        </h3>

                        <span
                            className={`shrink-0 rounded-full border px-3 py-1 text-xs font-extrabold ${badgeClass}`}
                            title="Urgency"
                        >
                            {item?.urgencyBadge}
                        </span>
                    </div>

                    <p className="mt-4 leading-7 text-[#485E57] line-clamp-3">
                        {item?.shortDescription}
                    </p>
                </div>
            </button>

            {/* MODAL */}
            {open && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby={`disease-title-${item?._id}`}
                    onMouseDown={(e) => {
                        if (e.target === e.currentTarget) close();
                    }}
                >
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-black/50" />

                    {/* Panel */}
                    <div className="relative z-10 w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl">
                        {/* Header */}
                        <div className="flex items-start justify-between gap-4 border-b p-5">
                            <div>
                                <h2
                                    id={`disease-title-${item?._id}`}
                                    className="text-2xl font-extrabold text-[#1E1E1E]"
                                >
                                    {item?.name}
                                </h2>

                                <div className="mt-2 flex items-center gap-2">
                                    <span
                                        className={`inline-flex rounded-full border px-3 py-1 text-xs font-extrabold ${badgeClass}`}
                                    >
                                        {item?.urgencyBadge}
                                    </span>
                                    <p className="text-sm text-[#485E57]">{item?.shortDescription}</p>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={close}
                                className="rounded-xl border border-black/10 px-3 py-2 text-sm font-bold hover:bg-black/5"
                                aria-label="Close"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Content */}
                        <div className="max-h-[75vh] overflow-y-auto p-5">
                            <div className="overflow-hidden rounded-xl border border-black/10 bg-white">
                                <img
                                    src={item?.thumbnailUrl}
                                    alt={item?.name}
                                    className="w-full object-cover"
                                    loading="lazy"
                                    onError={(e) => {
                                        e.currentTarget.src = "/images/diseases/placeholder.jpg";
                                    }}
                                />
                            </div>

                            <div className="mt-6 space-y-5">
                                <Section title="What is it?" text={item?.sections?.whatIsIt} />
                                <Section title="Common symptoms" text={item?.sections?.commonSymptomsText} />
                                <Section title="Causes" text={item?.sections?.causes} />
                                <Section title="Risk factors" text={item?.sections?.riskFactorsText} />
                                <Section title="Diagnosis" text={item?.sections?.diagnosis} />
                                <Section title="Treatment" text={item?.sections?.treatment} />
                                <Section title="Self care" text={item?.sections?.selfCare} />
                                <Section title="When to see a doctor" text={item?.sections?.whenToSeeDoctor} />
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="flex flex-col gap-3 border-t p-5 sm:flex-row sm:items-center sm:justify-end">
                            <button
                                type="button"
                                onClick={goReservation}
                                className="rounded-xl bg-[#E48A5B] px-4 py-2 text-sm font-extrabold text-white hover:opacity-90"
                            >
                                Book a reservation
                            </button>

                            <button
                                type="button"
                                onClick={close}
                                className="rounded-xl bg-black px-4 py-2 text-sm font-extrabold text-white hover:opacity-90"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

function Section({ title, text }) {
    if (!text) return null;
    return (
        <div>
            <h3 className="text-sm font-extrabold text-[#1E1E1E]">{title}</h3>
            <p className="mt-1 leading-7 text-[#485E57]">{text}</p>
        </div>
    );
}