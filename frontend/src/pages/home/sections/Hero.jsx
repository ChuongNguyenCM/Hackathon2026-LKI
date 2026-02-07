import heroPicture from "../../../../public/images/diseases/heroPicture.webp";
import Button from "../../../components/ui/Button";
import { useNavigate } from "react-router-dom";

export default function Hero() {
    const navigate = useNavigate();

    return (
        <section className="bg-[#044398]">
            <div className="mx-auto flex max-w-5xl flex-col items-center gap-10 px-6 py-16 md:flex-row md:items-center">
                <div className="w-full md:w-[55%]">
                    <h1 className="text-5xl font-extrabold text-[#F4CE14] md:text-6xl">
                        MediSearch
                    </h1>
                    <h3 className="mt-2 text-2xl font-bold text-white md:text-3xl">Fairborn, Ohio</h3>

                    <p className="mt-6 max-w-md text-lg leading-8 text-white/80">
                        Where Medical Insight Meets Vision
                    </p>

                    <div className="mt-8">
                        <Button onClick={() => navigate("/reservations")}>
                            Book a reservation
                        </Button>
                    </div>
                </div>

                <div className="flex w-full justify-center md:w-[45%]">
                    <img
                        src={heroPicture}
                        alt="Little Lemon restaurant in Chicago"
                        className="h-[280px] w-[220px] rounded-2xl object-cover shadow-2xl md:h-[420px] md:w-[320px]"
                    />
                </div>
            </div>
        </section>
    );
}
