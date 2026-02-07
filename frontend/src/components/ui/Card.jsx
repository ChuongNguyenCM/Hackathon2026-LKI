import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

export default function Card({ item }) {
    const navigate = useNavigate();

    return (
        <button
            type="button"
            className="overflow-hidden rounded-2xl border border-black/10 bg-[#F2F2F2] shadow-lg shadow-black/15 transition-transform duration-300 ease-out hover:scale-105 hover:shadow-xl"
            onClick={() => navigate("/reservations")}
        >
            <div className="p-5">
                <div className="overflow-hidden rounded-xl border border-black/15 bg-white">
                    <img
                        src={item.image}
                        alt={item.title}
                        className="aspect-[4/3] w-full object-cover"
                        loading="lazy"
                    />
                </div>
                <div className="mt-6 flex items-center justify-between">
                    <h3 className="text-2xl font-extrabold text-[#1E1E1E]">{item.title}</h3>
                    <span className="text-lg font-extrabold text-[#E48A5B]">{item.price}</span>
                </div>
                <p className="mt-4 leading-7 text-[#485E57]">{item.desc}</p>
                <div className="mt-8 inline-flex items-center gap-3 font-extrabold text-[#1E1E1E] hover:opacity-80">
                    <p>Order a delivery</p>
                    <ShoppingBagIcon className="h-6 w-6" />
                </div>
            </div>
        </button>
    );
}