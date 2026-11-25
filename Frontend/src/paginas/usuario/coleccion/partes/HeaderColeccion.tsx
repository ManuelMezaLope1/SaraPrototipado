import { Link } from "react-router";
import { COLLECTIONS, COLLECTIONS_INTRO } from "../variable/CollectionVariable";
import CollectionFeature from "../variable/ColeccionFeature";

export default function HeaderColeccion() {
    const featured = COLLECTIONS.find((c) => c.featured);
    
    return (
        <>
            <div className="page-container">
                <nav aria-label="Ruta" className="pt-12 text-[11px] text-sara-stone">
                    <Link to="/" className="hover:text-sara-ink">
                        Inicio
                    </Link>
                    <span className="mx-3">/</span>
                    <span className="font-medium text-sara-ink">Colecciones</span>
                </nav>

                {/* Cabecera centrada */}
                <header className="mx-auto mt-14 max-w-[900px] text-center">
                    <span className="eyebrow">{COLLECTIONS_INTRO.eyebrow}</span>
                    <h1 className="mt-6 text-5xl tracking-[-0.03em] md:text-7xl">{COLLECTIONS_INTRO.title}</h1>
                    <p className="mx-auto mt-8 max-w-[760px] text-[15px] leading-8 text-sara-stone">
                        {COLLECTIONS_INTRO.text}
                    </p>
                </header>

                {/* Colección destacada */}
                {featured && (
                    <div className="mt-16 md:mt-20">
                        <CollectionFeature collection={featured} />
                    </div>
                )}
            </div>
        </>
    )
}