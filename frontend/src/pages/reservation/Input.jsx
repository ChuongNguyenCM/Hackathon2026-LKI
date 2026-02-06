export default function Input({ invalid, className = "", ...props }) {
    return (
        <input
            {...props}
            className={[
                "w-full rounded-xl border bg-[#F2F2F2] px-4 py-4 text-[#1E1E1E] outline-none focus:ring-4",
                invalid
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500/15"
                    : "border-black/25 focus:border-[#485E57] focus:ring-[#485E57]/15",
                className,
            ].join(" ")}
        />
    );
}