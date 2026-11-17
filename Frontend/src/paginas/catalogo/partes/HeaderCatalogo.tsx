import { Link } from "react-router";
import { SORT_OPTIONS } from "../variable/ProductVariable";
import { ChevronDown, SlidersHorizontal } from "lucide-react";

export default function HeaderCatalogo() {
    return (
        <>
            <nav aria-label="Ruta" className="pt-12 text-[11px] text-sara-stone">
                <Link to="/" className="hover:text-sara-ink">
                    Inicio
                </Link>
                <span className="mx-3">/</span>
                <span className="font-medium text-sara-ink">Catálogo</span>
            </nav>

            <header className="mt-14">
                <span className="eyebrow">Colección 2026</span>
                <h1 className="mt-6 text-6xl tracking-[-0.03em] md:text-7xl">
                    Catálogo
                </h1>
                <div className="mt-8 flex items-end justify-between gap-4">
                    <p className="text-[14px] text-sara-stone">
                        Prendas y calzado pensados para acompañarte todos los días.
                    </p>

                    <p className="shrink-0 text-[11px] text-sara-stone" aria-live="polite">
                        8 productos
                    </p>
                </div>
            </header>

            <div className="mt-8 flex items-center justify-between border-y border-sara-line py-5">
                <button
                    type="button"
                    className="flex items-center gap-2 text-[12px] font-semibold lg:hidden">
                    <SlidersHorizontal size={16} /> Filtros
                </button>

                <label className="ml-auto flex items-center gap-3 text-[11px] text-sara-stone">
                    Ordenar por:
                    <span className="relative">
                        <select className="cursor-pointer appearance-none bg-transparent pr-7 text-[11px] font-semibold text-sara-ink outline-none">
                            {SORT_OPTIONS.map((o) => (
                                <option key={o.id} value={o.id}>
                                    {o.label}
                                </option>
                            ))}
                        </select>
                        <ChevronDown
                            size={16}
                            className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2"
                        />
                    </span>
                </label>
            </div>
        </>
    )
}