import { Link } from "react-router";
import { STORE_SERVICES } from "../variables/NosVariable";
import { ArrowRight } from "lucide-react";

export default function ServiciosNosotros() {
    const s = STORE_SERVICES;
    
    return (
        <>
            <div className="page-container xl:px-[236px]">
                <div className="mt-20 md:mt-28">
                    <section aria-labelledby="servicios-title">
                        <span className="eyebrow">{s.eyebrow}</span>
                        <h2 id="servicios-title" className="mt-4 text-4xl tracking-[-0.02em] md:text-5xl">
                            {s.title}
                        </h2>

                        <ol className="mt-12 grid divide-y divide-sara-line border-t border-sara-line md:grid-cols-3 md:divide-x md:divide-y-0">
                            {s.items.map((item) => (
                                <li key={item.number} className="px-0 py-10 md:px-10 md:first:pl-10">
                                    <span className="font-display text-3xl text-sara-stone/70">{item.number}</span>
                                    <h3 className="mt-10 text-3xl">{item.title}</h3>
                                    <p className="mt-5 max-w-sm text-[12px] leading-6 text-sara-stone">{item.text}</p>
                                </li>
                            ))}
                        </ol>

                        <div className="mt-10 text-center">
                            <Link to={s.cta.to} className="btn-primary">
                                {s.cta.label}
                                <ArrowRight size={18} strokeWidth={1.8} />
                            </Link>
                        </div>
                    </section>
                </div>
            </div>
        </>
    )
}