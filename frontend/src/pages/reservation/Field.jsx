export default function Field({ label, required, error, children }) {
    return (
        <label className="block">
            <span className="text-xl font-extrabold text-[#485E57]">
                {label}
                {required && <span className="text-red-500">*</span>}
            </span>

            <div className="mt-3">{children}</div>

            {error && (
                <p className="mt-2 text-sm font-semibold text-red-600">{error}</p>
            )}
        </label>
    );
}