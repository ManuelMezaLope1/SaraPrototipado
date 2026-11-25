import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import TituloPanel from '../variables/TituloPanel';
import { CANCELABLE, ORDER_FILTERS, STATUS_FLOW } from '../../../../data/DatosCuenta';
import { useOrders } from '../../../../contexto/OrderContexto';
import { formatDate } from '../../../../data/Format';
import OrderStatusBadge from '../variables/OrderStatusBadge';
import { formatPrice, getProductById } from '../../catalogo/variable/ProductVariable';
import { useAuth } from '../../../../contexto/AuthContexto';
import { useCart } from '../../../../contexto/CarroContexto';
import DetallesPedidos from '../DetallesPedidos';

export default function Pedidos() {
    const { userOrders } = useOrders();
    const [filter, setFilter] = useState('todos');

    const active = ORDER_FILTERS.find((f) => f.id === filter);
    const visible = active.statuses ? userOrders.filter((o) => active.statuses.includes(o.status)) : userOrders;

    const [isOpen, setIsOpen] = useState(false);

    const { code } = useParams();
    const { user, logout } = useAuth();
    const { getOrder, cancelOrder, advanceOrder } = useOrders();
    const { addItem } = useCart();
    const navigate = useNavigate();
    const [confirming, setConfirming] = useState(false);
    const [notice, setNotice] = useState('');

    const order = code ? getOrder(code) : null;

    const cancelable = CANCELABLE.includes(order?.status);
    const canAdvance = STATUS_FLOW.indexOf(order?.status) >= 0 && order?.status !== 'entregado';

    const handleReorder = () => {
        let added = 0;
        order?.items.forEach((item) => {
            const product = getProductById(item.productId);
            if (product && addItem(product, { size: item.size, color: item.color, qty: item.qty }).ok) added += 1;
        });
        if (added === 0) {
            setNotice('No pudimos agregar los productos: pueden estar agotados.');
            return;
        }
        navigate('/carrito');
    };

    return (
        <>
            {!isOpen && (
                <div>
                    <TituloPanel eyebrow="Historial" title="Mis pedidos" />

                    {userOrders.length === 0 ? (
                        <div className="mt-10 border border-dashed border-sara-line px-6 py-20 text-center">
                            <p className="text-[14px] text-sara-stone">Todavía no tienes pedidos.</p>
                            <Link to="/catalogo" className="btn-primary mt-8">
                                Explorar catálogo
                            </Link>
                        </div>
                    ) : (
                        <>
                            <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Filtrar pedidos">
                                {ORDER_FILTERS.map((f) => (
                                    <button
                                        key={f.id}
                                        type="button"
                                        role="tab"
                                        aria-selected={filter === f.id}
                                        onClick={() => setFilter(f.id)}
                                        className={`border px-5 py-2.5 text-[12px] transition-colors ${filter === f.id ? 'border-sara-ink bg-sara-ink text-white' : 'border-sara-line hover:border-sara-ink'
                                            }`}
                                    >
                                        {f.label}
                                    </button>
                                ))}
                            </div>

                            {visible.length === 0 ? (
                                <p className="mt-10 text-[13px] text-sara-stone">No hay pedidos en esta categoría.</p>
                            ) : (
                                <ul className="mt-8 space-y-5">
                                    {visible.map((order) => {
                                        const units = order?.items.reduce((n, i) => n + i.qty, 0);
                                        return (
                                            <li key={order?.code}>
                                                <button
                                                    onClick={() => setIsOpen(true)}
                                                    className="block border border-sara-line px-6 py-6 transition-colors hover:border-sara-ink"
                                                >
                                                    <div className="flex flex-wrap items-start justify-between gap-4">
                                                        <div>
                                                            <p className="font-display text-3xl">{order?.code}</p>
                                                            <p className="mt-1 text-[12px] text-sara-stone">{formatDate(order?.createdAt)}</p>
                                                        </div>
                                                        <OrderStatusBadge status={order?.status} deliveryType={order?.delivery?.type} />
                                                    </div>

                                                    <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                                                        <div className="flex items-center gap-2">
                                                            {order?.items.slice(0, 4).map((item, i) => (
                                                                <div key={i} className="h-16 w-12 overflow-hidden bg-sara-sand">
                                                                    <img src={item.image} alt="" className="h-full w-full object-cover" />
                                                                </div>
                                                            ))}
                                                            {order?.items.length > 4 && (
                                                                <span className="ml-1 text-[12px] text-sara-stone">+{order?.items.length - 4}</span>
                                                            )}
                                                        </div>
                                                        <p className="text-right text-[12px] text-sara-stone">
                                                            {units} {units === 1 ? 'producto' : 'productos'}
                                                            <span className="block text-[16px] text-sara-ink">{formatPrice(order?.totals.total)}</span>
                                                        </p>
                                                    </div>
                                                </button>
                                            </li>
                                        );
                                    })}



                                </ul>
                            )}
                        </>
                    )}
                </div>
            )}

            {
                isOpen && (
                    <DetallesPedidos></DetallesPedidos>
                )
            }
        </>
    );
}