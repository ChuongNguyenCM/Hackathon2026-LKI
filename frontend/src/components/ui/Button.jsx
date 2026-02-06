export default function Button({ children, onClick, type = "button" }) {
    return (
        <button
            type={type}
            onClick={onClick}
            className="rounded-full bg-[##007BFF ] px-8 py-4 text-lg font-bold text-[#1A1A1A ] shadow-md transition hover:scale-105"
        >
            {children}
        </button>
    );
}