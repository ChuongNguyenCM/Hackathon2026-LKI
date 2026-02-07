import { StarIcon } from "@heroicons/react/24/solid";

function Stars({ rating }) {
    return (
        <div className="mt-4 flex gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon
                    key={i}
                    className={`h-6 w-6 ${i < rating ? "text-[#F4CE14]" : "text-black/10"}`}
                />
            ))}
        </div>
    );
}

export default function TestimonialCard({ item }) {
    return (
        <article
            className="rounded-3xl border border-black/10 bg-white/30 p-8 shadow-lg shadow-black/10 backdrop-blur
                 transition-transform duration-300 ease-out hover:scale-[1.02] hover:shadow-xl"
        >
            {/* Top row: avatar + name */}
            <div className="flex items-start gap-4">
                <img
                    src={item.avatar}
                    alt={item.name}
                    className="h-12 w-12 rounded-full object-cover"
                    loading="lazy"
                />
                <div>
                    <p className="text-base font-extrabold text-[#1E1E1E]">{item.name}</p>
                    <p className="text-sm font-semibold text-black/60">{item.handle}</p>
                </div>
            </div>

            <Stars rating={item.rating} />

            <p className="mt-5 leading-7 text-[#1E1E1E]/80">“{item.quote}”</p>
        </article>
    );
}