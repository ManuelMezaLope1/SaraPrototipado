import { Link } from "react-router"
import { promoLink } from "./PromotionVariable"
import { ArrowRight } from "lucide-react"

interface Promo{
    promo: any
}

export default function PromoCard({promo}: Promo) {
    return (
        <>
            <article className="group flex min-h-[400px] flex-col border-sara-line p-8 transition-colors duration-300 hover:bg-sara-cream md:min-h-[430px] md:border-l md:p-10 md:first:border-l-0">
                <span className="self-start border border-sara-ink px-3 py-2 text-[9px] font-medium uppercase tracking-[0.12em]">
                    {promo.tag}
                </span>

                <p className="mt-auto pt-16 font-display text-[48px] leading-none">{promo.value}</p>
                <h3 className="mt-6 text-3xl">{promo.title}</h3>
                <p className="mt-5 max-w-sm text-[13px] leading-6 text-sara-stone">{promo.text}</p>

                <Link
                    to={promoLink(promo.id)}
                    className="mt-8 inline-flex items-center gap-3 self-start border-b border-sara-ink pb-2 text-[12px] font-semibold"
                >
                    {promo.cta}
                    <ArrowRight
                        size={16}
                        strokeWidth={1.8}
                        className="transition-transform group-hover:translate-x-1"
                    />
                </Link>
            </article>
        </>
    )
}