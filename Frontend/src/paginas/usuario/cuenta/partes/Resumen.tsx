import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import TituloPanel from '../variables/TituloPanel';
import { formatPrice } from '../../catalogo/variable/ProductVariable';
import { formatDate } from '../../../../data/Format';
import OrderStatusBadge from '../variables/OrderStatusBadge';
import { useAuth } from '../../../../contexto/AuthContexto';
import { useOrders } from '../../../../contexto/OrderContexto';
import { useStore } from '../../../../contexto/TiendaContexto';

function Stat({ tab, value, label, onTabChange }) {
    return (
        <button type="button" onClick={() => onTabChange(tab)} className="group border border-sara-line px-6 py-6 transition-colors hover:border-sara-ink cursor-pointer">
            <p className="font-display text-5xl">{value}</p>
            <p className="mt-2 flex items-center justify-between text-[12px] text-sara-stone">
                {label}
                <ArrowRight size={16} strokeWidth={1.6} className="transition-transform group-hover:translate-x-1" />
            </p>
        </button>
    );
}

export default function Resumen({ onTabChange }) {
    const { user } = useAuth();
    const { userOrders } = useOrders();
    const { favorites } = useStore();
    const last = userOrders[0];

    return (
        <div>
            <TituloPanel eyebrow="Resumen" title="Tu cuenta" />

            <div className="mt-10 grid gap-5 sm:grid-cols-3">
                <Stat tab="pedidos" value={userOrders.length} label="Pedidos" onTabChange={onTabChange}/>
                <Stat tab="favoritos" value={favorites.length} label="Favoritos" onTabChange={onTabChange}/>
                <Stat tab="direcciones" value={user.addresses?.length ?? 0} label="Direcciones" onTabChange={onTabChange}/>
            </div>

            <section className="mt-12" aria-label="Último pedido">
                <h3 className="font-sans text-[12px] font-semibold uppercase tracking-[0.14em]">Último pedido</h3>
                {last ? (
                    <Link
                        to={`/cuenta/pedidos/${last.code}`}
                        className="mt-4 flex flex-wrap items-center justify-between gap-4 border border-sara-line px-6 py-5 transition-colors hover:border-sara-ink"
                    >
                        <div>
                            <p className="font-display text-3xl">{last.code}</p>
                            <p className="mt-1 text-[12px] text-sara-stone">
                                {formatDate(last.createdAt)} · {formatPrice(last.totals.total)}
                            </p>
                        </div>
                        <OrderStatusBadge status={last.status} deliveryType={last.delivery.type} />
                    </Link>
                ) : (
                    <div className="mt-4 border border-dashed border-sara-line px-6 py-12 text-center">
                        <p className="text-[13px] text-sara-stone">Aún no tienes pedidos.</p>
                        <Link to="/catalogo" className="btn-primary mt-6">
                            Explorar catálogo
                        </Link>
                    </div>
                )}
            </section>

            <section className="mt-12 bg-sara-mist px-7 py-7" aria-label="Tus datos">
                <div className="flex items-start justify-between gap-4">
                    <h3 className="font-sans text-[12px] font-semibold uppercase tracking-[0.14em]">Tus datos</h3>
                    <Link to="/cuenta/datos" className="border-b border-sara-ink pb-0.5 text-[12px] font-semibold">
                        Editar
                    </Link>
                </div>
                <dl className="mt-5 grid gap-4 text-[13px] sm:grid-cols-2">
                    <div>
                        <dt className="text-[11px] text-sara-stone">Nombre</dt>
                        <dd>
                            {user.name} {user.lastName}
                        </dd>
                    </div>
                    <div>
                        <dt className="text-[11px] text-sara-stone">Correo</dt>
                        <dd>{user.email}</dd>
                    </div>
                    <div>
                        <dt className="text-[11px] text-sara-stone">Celular</dt>
                        <dd>{user.phone}</dd>
                    </div>
                    <div>
                        <dt className="text-[11px] text-sara-stone">DNI</dt>
                        <dd>{user.doc || '—'}</dd>
                    </div>
                </dl>
            </section>
        </div>
    );
}