import Hero from "./sections/Hero";
import About from "./sections/About";
import Testimonials from "./sections/Testimonial";
import { useEffect } from "react";
import { getHome } from "../../services/webService";


export default function Home() {
    const fetchHome = async () => {
        let response = await getHome();
        console.log(response);
    }

    useEffect(() => {
        fetchHome();
    });

    return (
        <main>
            <Hero />
            <About />
            <Testimonials />
        </main>
    );
}
