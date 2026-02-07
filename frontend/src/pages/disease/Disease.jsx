import Card from "../../components/ui/Card";
import { useEffect, useState } from "react";
import { getDisease } from "../../services/webService";

export default function Menu() {
    const [diseases, setDiseases] = useState([]);

    const fetchMenu = async () => {
        try {
            const res = await getDisease();
            if (res.EC === 0) setDiseases(res.DT || []);
        } catch (err) {
            console.error("fetchDiseases error:", err);
        }
    }

    useEffect(() => {
        fetchMenu();
    });
    return (
        <section className="w-full bg-[#F2F2F2]">
            <div className="mx-auto max-w-5xl px-6 py-20">
                {/* Header row */}
                <div className="flex items-center justify-center gap-6">
                    <h2 className="text-5xl font-black tracking-tight text-[#1E1E1E]">
                        Diseases
                    </h2>
                </div>

                {/* Cards */}
                <div className="mt-14 grid gap-10 md:grid-cols-3">
                    {diseases.map((item) => (
                        <Card key={item._id} item={item} />
                    ))}
                </div>
            </div>
        </section>
    );
}
