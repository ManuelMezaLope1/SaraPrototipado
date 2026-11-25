import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import NotFound from '../../componentes/notfound/NotFound';
import { useAuth } from '../../contexto/AuthContexto';
import { useCart } from '../../contexto/CarroContexto';
import { useOrders } from '../../contexto/OrderContexto';
import { CANCELABLE, STATUS_FLOW } from '../../data/DatosCuenta';
import { formatDate } from '../../data/Format';
import { getProductById } from '../catalogo/variable/ProductVariable';
import OrderDetails from '../checkout/variables/DetallesOrden';
import OrderStatusBadge from './variables/OrderStatusBadge';

const LINKS = [
  { id: 'resumen', label: 'Resumen' },
  { id: 'pedidos', label: 'Mis pedidos' },
  { id: 'datos', label: 'Datos personales' },
  { id: 'direcciones', label: 'Direcciones' },
  { id: 'favoritos', label: 'Favoritos' },
  { id: 'preferencias', label: 'Preferencias' },
  { id: 'reservacion', label: 'Mis Reservaciones' },
];

export default function DetallesPedidos() {
  const { code } = useParams();
  const { user, logout } = useAuth();
  const { getOrder, cancelOrder, advanceOrder } = useOrders();
  const { addItem } = useCart();
  const navigate = useNavigate();
  const [confirming, setConfirming] = useState(false);
  const [notice, setNotice] = useState('');

  const order = getOrder(code);
  if (!order || order.userId !== user.id) return <NotFound />;

  const cancelable = CANCELABLE.includes(order.status);
  const canAdvance = STATUS_FLOW.indexOf(order.status) >= 0 && order.status !== 'entregado';

  const handleReorder = () => {
    let added = 0;
    order.items.forEach((item) => {
      const product = getProductById(item.productId);
      if (product && addItem(product, { size: item.size, color: item.color, qty: item.qty }).ok) added += 1;
    });
    if (added === 0) {
      setNotice('No pudimos agregar los productos: pueden estar agotados.');
      return;
    }
    navigate('/carrito');
  };

  const [activeTab, setActiveTab] = useState("resumen");

  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
  };

  return (
    <div className="page-container pb-24 pt-14">
      <span className="eyebrow">Mi cuenta</span>
      <h1 className="mt-6 text-5xl tracking-[-0.03em] md:text-6xl">Hola, {user.name}</h1>

      <div className="mt-12 grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-16">
        <nav aria-label="Panel de cliente" className="lg:sticky lg:top-28 lg:self-start">
          <ul className="flex gap-2 overflow-x-auto border-b border-sara-line pb-3 lg:flex-col lg:gap-0 lg:overflow-visible lg:border-b-0 lg:pb-0">
            {LINKS.map((tab) => (
              <li key={tab.id} className="shrink-0">
                <button
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`block whitespace-nowrap px-4 py-3 text-[13px] transition-colors lg:border-l-2 lg:py-3.5 cursor-pointer ${activeTab === tab.id
                    ? "bg-sara-ink font-semibold text-white lg:border-sara-ink lg:bg-transparent lg:text-sara-ink"
                    : "text-sara-stone hover:text-sara-ink lg:border-sara-line"
                    }`}
                >
                  {tab.label}
                </button>
              </li>
            ))}
            <li className="shrink-0 lg:mt-4">
              <button
                type="button"
                onClick={handleLogout}
                className="block whitespace-nowrap px-4 py-3 text-[13px] font-semibold underline-offset-4 hover:underline lg:border-l-2 lg:border-sara-line lg:py-3.5"
              >
                Cerrar sesión
              </button>
            </li>
          </ul>
        </nav>

        <div>
          <Link to="/cuenta" className="text-[12px] font-semibold text-sara-stone hover:text-sara-ink">
            ← Mis pedidos
          </Link>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-b border-sara-line pb-8">
            <div>
              <p className="font-display text-5xl">{order.code}</p>
              <p className="mt-2 text-[12px] text-sara-stone">Realizado el {formatDate(order.createdAt)}</p>
            </div>
            <OrderStatusBadge status={order.status} deliveryType={order.delivery.type} />
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button type="button" onClick={handleReorder} className="btn-outline">
              Volver a comprar
            </button>

            {cancelable &&
              (confirming ? (
                <span className="flex flex-wrap items-center gap-4">
                  <span className="text-[13px] font-semibold">¿Cancelar este pedido?</span>
                  <button
                    type="button"
                    onClick={() => {
                      cancelOrder(order.code);
                      setConfirming(false);
                    }}
                    className="bg-red-700 px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white hover:bg-red-800"
                  >
                    Sí, cancelar
                  </button>
                  <button type="button" onClick={() => setConfirming(false)} className="border-b border-sara-ink pb-0.5 text-[12px] font-semibold">
                    No
                  </button>
                </span>
              ) : (
                <button type="button" onClick={() => setConfirming(true)} className="border-b border-sara-ink pb-0.5 text-[12px] font-semibold">
                  Cancelar pedido
                </button>
              ))}

            {canAdvance && (
              <button
                type="button"
                onClick={() => advanceOrder(order.code)}
                className="ml-auto text-[11px] text-sara-stone underline underline-offset-4 hover:text-sara-ink"
                title="Solo para la demo: simula que la tienda actualiza el estado"
              >
                Demo: avanzar estado
              </button>
            )}
          </div>
          {notice && (
            <p role="alert" className="mt-4 text-[12px] text-red-700">
              {notice}
            </p>
          )}

          <div className="mt-10">
            <OrderDetails order={order} />
          </div>
        </div>
      </div>
    </div>
  );
}