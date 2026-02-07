import about from "../../../../public/images/diseases/about.jpg";

export default function About() {
    return (
        <section className="w-full bg-[#F2F2F2]">
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-20 px-6 py-20 md:grid-cols-2 md:items-center">
                {/* LEFT: text */}
                <div>
                    <h2 className="text-5xl font-black tracking-tight text-[#157FCB]">
                        MediSearch
                    </h2>
                    <p className="mt-2 text-3xl font-black text-[#1E1E1E]">Ohio</p>

                    <p className="mt-8 max-w-prose leading-8 text-[#1E1E1E]/70">
                        MediSearch is a user-friendly health website designed with a clean interface that is easy to navigate for everyone, from tech-savvy youth to seniors. Powered by advanced AI, the platform quickly analyzes your symptoms to provide precise and understandable medical explanations. Unlike general search engines, it ensures maximum reliability by sourcing information exclusively from trusted scientific databases and clinical journals. Every answer comes with direct citations, giving you peace of mind regarding the accuracy of your health data. It is a safe, professional, and English-optimized tool for anyone seeking credible medical insights. Experience the future of healthcare research where simplicity meets scientific integrity.
                    </p>
                </div>

                {/* RIGHT: images */}
                <div className="w-full mx-auto max-w-md md:max-w-none">
                    <div
                        className="relative z-10 overflow-hidden rounded-3xl shadow-xl transition-all duration-300 ease-out hover:z-30 hover:scale-105"
                    >
                        <img
                            src={about}
                            alt="Little Lemon interior"
                            className="h-[420px] w-full object-cover"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}