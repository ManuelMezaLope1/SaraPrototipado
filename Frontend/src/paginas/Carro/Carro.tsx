import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { useAuth } from "../../contexto/AuthContexto";
import { useCart } from "../../contexto/CarroContexto";
import CartLine from "./variables/CartLine";
import OrderTotals from "./variables/OrderTotal";

export default function Carro() {
    const { priced, count, maxFor, updateQty, removeItem, totalsFor } = useCart();
    const { isAuthenticated } = useAuth();
    const totals = totalsFor('tienda');

    return (
        <>
            <div className="page-container pb-24 pt-14">
                <span className="eyebrow">Tu selección</span>
                <h1 className="mt-6 text-6xl tracking-[-0.03em]">Carrito</h1>

                {priced.length === 0 ? (
                    <div className="mt-12 border border-dashed border-sara-line px-6 py-24 text-center">
                        <p className="text-[14px] text-sara-stone">Tu carrito está vacío.</p>
                        <Link to="/catalogo" className="btn-primary mt-8">
                            Explorar catálogo
                        </Link>
                    </div>
                ) : (
                    <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_400px] xl:gap-20">
                        <section aria-label="Productos en el carrito">
                            <p className="border-b border-sara-line pb-4 text-[12px] text-sara-stone">
                                {count} {count === 1 ? 'producto' : 'productos'}
                            </p>
                            <ul className="divide-y divide-sara-line">
                                {priced.map((line) => (
                                    <CartLine
                                        key={line.key}
                                        line={line}
                                        max={maxFor(line)}
                                        onQty={(qty) => updateQty(line.key, qty)}
                                        onRemove={() => removeItem(line.key)}
                                    />
                                ))}
                            </ul>
                            <Link
                                to="/catalogo"
                                className="mt-4 inline-block border-b border-sara-ink pb-1 text-[12px] font-semibold"
                            >
                                Seguir comprando
                            </Link>
                        </section>

                        <aside className="h-fit bg-sara-mist px-7 py-8 lg:sticky lg:top-28">
                            <h2 className="text-3xl">Resumen</h2>
                            <div className="mt-8">
                                <OrderTotals totals={totals} shippingNote="Se calcula en el checkout" />
                            </div>
                            <Link to="/checkout" className="btn-primary mt-8 w-full">
                                Continuar con la compra
                                <ArrowRight size={18} strokeWidth={1.8} />
                            </Link>
                            <p className="mt-4 text-center text-[11px] leading-5 text-sara-stone">
                                {isAuthenticated
                                    ? 'Usaremos los datos de tu cuenta.'
                                    : 'No necesitas una cuenta: puedes comprar como invitado.'}
                            </p>
                            <p className="mt-2 text-center text-[11px] text-sara-stone">
                                Retiro en tienda gratis · Envío a domicilio desde el siguiente paso
                            </p>
                        </aside>
                    </div>
                )}
            </div>
        </>
    )
}