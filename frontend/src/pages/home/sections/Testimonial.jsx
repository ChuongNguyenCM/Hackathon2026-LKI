import TestimonialCard from "./TestimonialCard";
import ava from "../../../../public/images/user/ava.avif"
import ethan from "../../../../public/images/user/ethan.avif"
import nina from "../../../../public/images/user/nina.avif"
import omar from "../../../../public/images/user/omar.avif"

const testimonials = [
    {
        id: "ava",
        name: "Ava Bennett",
        handle: "ava.bites",
        rating: 5,
        quote: "The eye exam was thorough but quick. They explained everything clearly and I left feeling confident.",
        avatar: ava,
    },
    {
        id: "ethan",
        name: "Ethan Park",
        handle: "ep_park",
        rating: 5,
        quote: "Booked an appointment in under a minute. Check-in was smooth and the staff were super professional.",
        avatar: ethan,
    },
    {
        id: "nina",
        name: "Nina Alvarez",
        handle: "nina.alv",
        rating: 4,
        quote: "Great experience overall. My new prescription feels perfect, and they helped me choose frames that actually suit me.",
        avatar: nina,
    },
    {
        id: "omar",
        name: "Omar Hassan",
        handle: "omarsplate",
        rating: 5,
        quote: "Friendly clinic with a calming vibe. The doctor was patient, answered all my questions, and the service was excellent.",
        avatar: omar,
    },
];

export default function Testimonials() {
    return (
        <section className="w-full bg-[#F7F1EA]">
            <div className="mx-auto max-w-6xl px-6 py-24">
                <h2 className="text-center text-4xl font-black tracking-tight text-[#1E1E1E]">
                    What do our customers think?
                </h2>

                <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
                    {testimonials.map((t) => (
                        <TestimonialCard key={t.id} item={t} />
                    ))}
                </div>
            </div>
        </section>
    );
}