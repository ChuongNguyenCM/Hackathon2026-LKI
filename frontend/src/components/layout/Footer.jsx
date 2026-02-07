import logo from "../../assets/logo/logo.png";

const footerColumns = [
    {
        title: "Company",
        links: [
            { label: "About Us", href: "#" },
            { label: "Features", href: "#" },
            { label: "Pricing", href: "#" },
            { label: "Latest News", href: "#" },
        ],
    },
    {
        title: "Support",
        links: [
            { label: "FAQ", href: "#" },
            { label: "Terms & Conditions", href: "#" },
            { label: "Privacy Policy", href: "#" },
            { label: "Contact Us", href: "#" },
        ],
    },
];

const address = [
    { label: "Location", value: "3640 Colonel Glenn Hwy, Dayton, OH 45435, USA" },
    { label: "Email", value: "email@gmail.com" },
    { label: "Phone", value: "+1 (000) 1234 567 890" },
];

const socials = ["Twitter", "Facebook", "LinkedIn", "Instagram"];

export default function Footer() {
    return (
        <footer className="w-full bg-[#061A2D ] text-[#1A1A1A]">
            <div className="mx-auto w-full max-w-6xl px-6 py-16">
                <div className="grid gap-12 md:grid-cols-[2fr_1fr_1fr_1.2fr]">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-3">
                            <img src={logo} alt="Little Lemon" className="h-35 w-auto" />
                        </div>

                        {/* Social */}
                        <div className="mt-6 flex items-center gap-4">
                            {socials.map((social) => (
                                <a
                                    key={social}
                                    href="#"
                                    className="rounded text-sm font-semibold hover:text-[#005FCC] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#007BFF ]/40"
                                >
                                    {social}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Columns */}
                    <nav aria-label="Footer" className="contents">
                        {footerColumns.map((col) => (
                            <div key={col.title}>
                                <h3 className="text-lg font-bold tracking-wide">{col.title}</h3>
                                <div className="mt-3 h-px w-28 bg-[#061A2D]/30" />

                                <ul className="mt-4 space-y-3">
                                    {col.links.map((link) => (
                                        <li key={link.label}>
                                            <a
                                                href={link.href}
                                                className="inline-flex items-center rounded text-sm font-semibold text-[#5A6B7A ]/90 underline decoration-transparent underline-offset-4 hover:text-[#005FCC ] hover:decoration-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-[##E2E8F0]/40"
                                            >
                                                {link.label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}

                        {/* Address */}
                        <div>
                            <h3 className="text-lg font-bold tracking-wide">Address</h3>
                            <div className="mt-3 h-px w-28 bg-[#061A2D]/30" />

                            <div className="mt-4 space-y-3 text-sm font-medium text-[#1A1A1A]/90">
                                {address.map((row) => (
                                    <p key={row.label}>
                                        <span className="font-bold text-[#1A1A1A]">
                                            {row.label}:
                                        </span>{" "}
                                        {row.value}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </nav>
                </div>

                {/* Divider */}
                <div className="mt-14 h-px w-full bg-[#061A2D]/30" />

                {/* Bottom */}
                <div className="mt-8 flex flex-col items-center justify-between gap-3 text-sm md:flex-row">
                    <p className="text-[#1A1A1A]/80">
                        © {new Date().getFullYear()} MediSearch. All rights reserved.
                    </p>

                    <div className="flex items-center gap-6">
                        <a
                            href="#"
                            className="inline-flex rounded text-sm font-semibold text-[#1A1A1A]/90 underline decoration-transparent underline-offset-4 hover:text-[#2F3E39] hover:decoration-amber-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#485E57]/40"
                        >
                            Privacy
                        </a>
                        <a
                            href="#"
                            className="inline-flex rounded text-sm font-semibold text-[#1A1A1A]/90 underline decoration-transparent underline-offset-4 hover:text-[#2F3E39] hover:decoration-amber-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#485E57]/40"
                        >
                            Terms
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
