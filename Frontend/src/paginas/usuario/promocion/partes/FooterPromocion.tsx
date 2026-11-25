import { PROMO_STEPS } from "../variables/PromotionVariable";

export default function FooterPromocion() {
    return (
        <>
            <div className="page-container xl:px-[236px]">
                <section aria-label="Cómo aprovechar las promociones" className="bg-sara-mist px-8 py-14 md:px-20 md:py-20">
                    <ol className="grid gap-10 md:grid-cols-3 md:gap-16">
                        {PROMO_STEPS.map((s) => (
                            <li key={s.number}>
                                <span className="font-display text-3xl text-sara-stone/70">{s.number}</span>
                                <h3 className="mt-10 font-sans text-[14px] font-semibold">{s.title}</h3>
                                <p className="mt-2 max-w-xs text-[13px] leading-6 text-sara-stone">{s.text}</p>
                            </li>
                        ))}
                    </ol>
                </section>
            </div>
        </>
    )
}