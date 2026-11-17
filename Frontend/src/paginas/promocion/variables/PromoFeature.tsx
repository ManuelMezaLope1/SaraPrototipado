import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

interface Promo{
    promo: any;
}

export default function PromoFeature({promo}: Promo) {
    return (
        <>
            <article className="grid overflow-hidden lg:grid-cols-[3fr_4fr]">
                <div className="flex flex-col justify-center bg-sara-dark px-8 py-14 text-white md:px-14 lg:px-20">
                    <span className="eyebrow self-start border-white/50 text-white/70">{promo.eyebrow}</span>

                    <p className="mt-8 font-display text-[clamp(4.5rem,8vw,7rem)] leading-none">{promo.value}</p>
                    <h2 className="mt-4 text-4xl tracking-[-0.01em] md:text-5xl">{promo.title}</h2>

                    <p className="mt-8 max-w-md text-[14px] leading-7 text-white/80">{promo.text}</p>

                    <Link
                        to={promo.cta.to}
                        className="mt-8 inline-flex items-center justify-center gap-5 self-start bg-sara-blush px-7 py-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-white hover:text-sara-ink"
                    >
                        {promo.cta.label}
                        <ArrowRight size={18} strokeWidth={1.8} />
                    </Link>

                    <p className="mt-8 text-[10px] text-white/50">{promo.note}</p>
                </div>

                <div className="h-[460px] bg-sara-sand md:h-[600px] lg:h-auto lg:min-h-[640px] xl:min-h-[740px]">
                    <img
                        src={promo.image}
                        alt={`${promo.value} ${promo.title}`}
                        className="h-full w-full object-cover"
                    />
                </div>
            </article>
        </>
    )
}