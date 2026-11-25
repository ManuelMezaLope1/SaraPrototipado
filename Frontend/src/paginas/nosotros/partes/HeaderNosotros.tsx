import { Link } from "react-router";
import { STORE_INTRO } from "../variables/NosVariable";

export default function HeaderNosotros() {
    return (
        <>
            <div className="page-container">
                <nav aria-label="Ruta" className="pt-12 text-[11px] text-sara-stone">
                    <Link to="/" className="hover:text-sara-ink">
                        Inicio
                    </Link>
                    <span className="mx-3">/</span>
                    <span className="font-medium text-sara-ink">Nuestra tienda</span>
                </nav>

                <header className="mx-auto mt-14 max-w-[900px] text-center">
                    <span className="eyebrow">{STORE_INTRO.eyebrow}</span>
                    <h1 className="mt-6 text-5xl tracking-[-0.03em] md:text-7xl">{STORE_INTRO.title}</h1>
                    <p className="mx-auto mt-8 max-w-[760px] text-[15px] leading-8 text-sara-stone">
                        {STORE_INTRO.text}
                    </p>
                </header>
            </div>
        </>
    )
}