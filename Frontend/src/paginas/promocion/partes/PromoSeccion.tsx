import PromoCard from "../variables/PromoCard";
import { PROMOS_SECTION, PROMOTIONS } from "../variables/PromotionVariable";

export default function PromoSeccion() {
    return (
        <>
            <div className="page-container xl:px-[236px]">
                <section className="mt-24 md:mt-32" aria-labelledby="promos-title">
                    <span className="eyebrow">{PROMOS_SECTION.eyebrow}</span>
                    <h2 id="promos-title" className="mt-4 text-4xl tracking-[-0.02em] md:text-5xl">
                        {PROMOS_SECTION.title}
                    </h2>

                    <div className="mt-12 grid divide-y divide-sara-line border-y border-sara-line md:grid-cols-3 md:divide-y-0">
                        {PROMOTIONS.map((promo) => (
                            <PromoCard key={promo.id} promo={promo} />
                        ))}
                    </div>
                </section>
            </div>
        </>
    )
}