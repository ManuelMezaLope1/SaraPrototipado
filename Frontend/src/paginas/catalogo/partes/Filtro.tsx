import { CATEGORIES, COLORS, PRICE_RANGE, SIZES } from "../variable/ProductVariable";

export default function Filtro() {
    return (
        <>
            <aside aria-label="Filtros">
                <div className="mb-5 flex items-center justify-between pb-1">
                    <h2 className="text-[24px]">Filtros</h2>
                    <button
                        type="button"
                        className="border-b border-sara-line text-[11px] text-sara-stone transition-colors hover:border-sara-ink hover:text-sara-ink">
                        Restablecer
                    </button>
                </div>

                <section title="Categorías">
                    <ul className="space-y-3.5">
                        {CATEGORIES.map((c) => (
                            <li key={c.id}>
                                <label className="flex cursor-pointer items-center gap-3 text-[12px]">
                                    <input
                                        type="checkbox"
                                        className="h-4 w-4 accent-black"/>
                                    <span className="flex-1">{c.label}</span>
                                    <span className="text-[11px] text-sara-stone">0</span>
                                </label>
                            </li>
                        ))}
                    </ul>
                </section>
                <br />
                <hr className="border-sara-line"/>
                <br />
                <section title="Tallas">
                    <div className="grid grid-cols-4 gap-px">
                        {SIZES.map((s) => {
                            return (
                                <button
                                    key={s}
                                    type="button"
                                    className={`h-14 border text-[11px] border-sara-line transition duration-300 hover:border-sara-ink cursor-pointer`}
                                >
                                    {s}
                                </button>
                            );
                        })}
                    </div>
                </section>
                <br />
                <hr className="border-sara-line"/>
                <br />
                <section title="Colores">
                    <ul className="grid grid-cols-2 gap-y-4">
                        {COLORS.map((c) => {
                            return (
                                <li key={c.id}>
                                    <button
                                        type="button"
                                        className="flex items-center gap-3 text-[11px] text-sara-stone"
                                    >
                                        <span
                                            className={`h-5 w-5 rounded-full border border-sara-line`}
                                            style={{ backgroundColor: c.hex }}
                                        />
                                        <span className={'text-sara-ink'}>{c.label}</span>
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </section>
                <br />
                <hr className="border-sara-line"/>
                <br />
                <section title="Rango de precios">
                    <input
                        type="range"
                        min={PRICE_RANGE.min}
                        max={PRICE_RANGE.max}
                        step={PRICE_RANGE.step}
                        aria-label="Precio máximo"
                    />
                    <div className="mt-4 flex justify-between text-[11px]">
                        <span>S/ {PRICE_RANGE.min.toFixed(2)}</span>
                        <span className="font-semibold">Hasta S/ 5</span>
                    </div>
                </section>
            </aside>
        </>
    )
}