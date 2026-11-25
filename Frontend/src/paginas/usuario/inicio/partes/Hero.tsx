import { ArrowRight } from "lucide-react";
import { HERO } from "../variable/HomeVariable";
import { Link } from "react-router";

export default function Hero() {
    return (
        <section className="mx-auto w-full max-w-[1900px] lg:px-[50px]">
            <div className="grid lg:min-h-[640px] lg:grid-cols-[46fr_54fr] xl:min-h-[730px]">
                <div className="flex flex-col justify-center bg-sara-cream px-6 py-16 md:px-12 lg:px-[74px]">
                    <span className="eyebrow self-start">{HERO.eyebrow}</span>

                    <h1 className="mt-8 text-[clamp(2.875rem,6vw,6.125rem)] leading-[0.95] tracking-[-0.03em]">
                        {HERO.titleLines.map((line) => (
                            <span key={line} className="block">
                                {line}
                            </span>
                        ))}
                    </h1>

                    <p className="mt-10 max-w-[500px] text-[15px] leading-8 text-sara-stone">{HERO.text}</p>

                    <Link to={HERO.cta.to} className="btn-primary mt-12 self-start">
                        {HERO.cta.label}
                        <ArrowRight size={18} strokeWidth={1.8} />
                    </Link>
                </div>

                <div className="relative min-h-[420px] overflow-hidden bg-sara-sand">
                    <img
                        src={HERO.image}
                        alt="Pareja con prendas de la nueva temporada"
                        className="absolute inset-0 h-full w-full object-cover"
                    />

                    <span className="absolute bottom-6 left-6 bg-sara-cream/90 px-3 py-2 text-[10px] uppercase tracking-[0.18em] text-sara-stone">
                        {HERO.imageCaption}
                    </span>
                    <div className="absolute bottom-6 right-6 flex h-[120px] w-[120px] flex-col items-center justify-center rounded-full bg-sara-ink text-center text-white md:h-[148px] md:w-[148px]">
                        <span className="font-display text-3xl leading-none md:text-4xl">{HERO.badge.value}</span>
                        <span className="mt-2 max-w-[80px] text-[10px] font-semibold uppercase leading-tight tracking-[0.14em]">
                            {HERO.badge.label}
                        </span>
                    </div>
                </div>
            </div>
        </section>
    )
}