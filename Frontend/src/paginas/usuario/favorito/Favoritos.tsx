import { Link } from "react-router";
import { useStore } from "../../../contexto/TiendaContexto";
import { products } from "../catalogo/variable/ProductVariable";
import Productos from "../catalogo/partes/Productos";

export default function Favoritos() {
    const { favorites } = useStore();
    const items = products.filter((p) => favorites.includes(p.id));

    return (
        <>
            <div className="page-container pb-24 pt-14">
                <span className="eyebrow">Tu selección</span>
                <h1 className="mt-6 text-6xl tracking-[-0.03em]">Favoritos</h1>

                {items.length === 0 ? (
                    <div className="mt-12 border border-dashed border-sara-line px-6 py-24 text-center">
                        <p className="text-[14px] text-sara-stone">Aún no has guardado ningún producto.</p>
                        <Link to="/catalogo" className="btn-primary mt-8">
                            Explorar catálogo
                        </Link>
                    </div>
                ) : (
                    <Productos items={items} className="mt-12 xl:grid-cols-4" />
                )}
            </div>
        </>
    )
}