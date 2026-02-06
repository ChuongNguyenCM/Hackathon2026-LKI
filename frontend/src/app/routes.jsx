import { createBrowserRouter, Link } from "react-router-dom";
import RootLayout from "./RootLayout.jsx";

import Home from "../pages/home/Home.jsx"
import Disease from "../pages/disease/Disease.jsx"
import Reservations from "../pages/reservation/Reservation.jsx"

export const router = createBrowserRouter([
    {
        element: <RootLayout />,
        children: [
            { path: "/", element: <Home /> },
            { path: "/reservations", element: <Reservations /> },
            { path: "/disease", element: <Disease /> },
            {
                path: "*",
                element: (
                    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-6">
                        <h1 className="text-4xl font-black text-[#1A1A1A]">404</h1>
                        <p className="text-lg text-[#1A1A1A]">Page not found.</p>
                        <Link to="/" className="font-semibold text-[#5A6B7A ] underline hover:text-[#005FCC ]">
                            Back to Home
                        </Link>
                    </div>
                ),
            },
        ],
    },
]);
