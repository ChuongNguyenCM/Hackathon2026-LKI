import React from 'react'
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import logo from "../../assets/logo/logoHeader.png"

const Header = () => {
    const [open, setOpen] = useState(false);

    const navClass = ({ isActive }) =>
        `font-semibold text-[#485E57] hover:text-[#2F3F3A] transition hover:cursor-pointer ${isActive ? "underline underline-offset-8" : ""
        }`;

    const mobileNavClass = ({ isActive }) =>
        `block rounded-md px-3 py-2 hover:cursor-pointer font-semibold text-[#485E57] hover:bg-gray-100 hover:text-[#2F3F3A] transition ${isActive ? "bg-gray-200" : ""
        }`;

    return (
        <header className="w-full bg-[#F2F2F2]">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6">
                <Link to="/" className="flex shrink-0 items-center">
                    <img src={logo} alt="Logo" className="w-50 h-auto object-contain" />
                </Link>

                {/* Desktop nav */}
                <nav className="hidden sm:flex sm:items-center sm:gap-12">
                    <NavLink to="/" className={navClass}>
                        Home
                    </NavLink>
                    <NavLink to="/disease" className={navClass}>
                        Menu
                    </NavLink>
                    <NavLink to="/reservations" className={navClass}>
                        Reservations
                    </NavLink>
                </nav>

                {/* Mobile hamburger */}
                <button
                    className="rounded-md p-2 text-[#485E57] transition hover:bg-gray-200 sm:hidden"
                    onClick={() => setOpen((s) => !s)}
                    aria-label="Toggle menu"
                    aria-expanded={open}
                >
                    {open ? (
                        <XMarkIcon className="h-7 w-7" />
                    ) : (
                        <Bars3Icon className="h-7 w-7" />
                    )}
                </button>
            </div>

            {/* Mobile menu */}
            <div
                className={`overflow-hidden border-t border-gray-300 transition-all duration-300 md:hidden ${open ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
                    }`}
            >
                <nav className="space-y-2 px-6 py-4">
                    <NavLink
                        to="/"
                        className={mobileNavClass}
                        onClick={() => setOpen(false)}
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/disease"
                        className={mobileNavClass}
                        onClick={() => setOpen(false)}
                    >
                        Disease
                    </NavLink>
                    <NavLink
                        to="/reservations"
                        className={mobileNavClass}
                        onClick={() => setOpen(false)}
                    >
                        Reservations
                    </NavLink>
                </nav>
            </div>
        </header>
    )
}

export default Header