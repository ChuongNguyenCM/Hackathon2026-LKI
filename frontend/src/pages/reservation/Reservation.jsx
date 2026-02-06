import ReservationForm from "./ReservationForm";

export default function Reservations() {
    return (
        <section className="w-full bg-[#F2F2F2] py-20">
            <div className="mx-auto max-w-xl rounded-xl border border-black/25 px-6 py-16">
                <h1 className="text-center text-5xl font-black tracking-tight text-[#1E1E1E]">
                    Book Your Reservation
                </h1>

                <div className="mt-8">
                    <ReservationForm />
                </div>
            </div>
        </section>
    );
}