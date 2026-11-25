import { Link } from "react-router";
import { PROMO_FEATURE, PROMOS_INTRO } from "../variables/PromotionVariable";
import PromoFeature from "../variables/PromoFeature";

export default function HeaderPromocion() {
    return (
        <>
            <div className="page-container">
                <nav aria-label="Ruta" className="pt-12 text-[11px] text-sara-stone">
                    <Link to="/" className="hover:text-sara-ink">
                        Inicio
                    </Link>
                    <span className="mx-3">/</span>
                    <span className="font-medium text-sara-ink">Promociones</span>
                </nav>

                <header className="mx-auto mt-14 max-w-[900px] text-center">
                    <span className="eyebrow">{PROMOS_INTRO.eyebrow}</span>
                    <h1 className="mt-6 text-5xl tracking-[-0.03em] md:text-7xl">{PROMOS_INTRO.title}</h1>
                    <p className="mx-auto mt-8 max-w-[700px] text-[15px] leading-8 text-sara-stone">
                        {PROMOS_INTRO.text}
                    </p>
                </header>

                <div className="mt-16 md:mt-20">
                    <PromoFeature promo={PROMO_FEATURE} />
                </div>
            </div>
        </>
    )
}