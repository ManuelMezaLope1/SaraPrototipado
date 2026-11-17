import { Link, useParams } from 'react-router-dom';
import { Check } from 'lucide-react';
import { SHIPPING, WALLET } from '../../data/DatosCuenta';
import { useOrders } from '../../contexto/OrderContexto';
import { useAuth } from '../../contexto/AuthContexto';
import { MAP_ADDRESS } from '../nosotros/variables/NosVariable';
import NotFound from '../../componentes/notfound/NotFound';
import DetallesOrden from './variables/DetallesOrden';

function nextSteps(order) {
  const home = order.delivery.type === 'domicilio';
  const { method } = order.payment;
  if (method === 'tarjeta') {
    return home
      ? `Tu pago fue aprobado. Te entregaremos tu pedido en ${SHIPPING.homeEta}.`
      : `Tu pago fue aprobado. Retira tu pedido en ${MAP_ADDRESS} con tu código y tu DNI.`;
  }
  if (method === 'yape' || method === 'plin') {
    return `Validaremos tu pago al ${WALLET.number} y te confirmaremos por correo o WhatsApp.`;
  }
  return home
    ? 'Te llamaremos para coordinar la entrega. Pagas al recibir tu pedido.'
    : `Reservamos tus prendas por 48 horas. Pasa por ${MAP_ADDRESS} y paga al retirarlas.`;
}

export default function ConfirmacionOrden() {
  const { code } = useParams();
  const { getOrder } = useOrders();
  const { user, isAuthenticated } = useAuth();
  const order = getOrder(code);

  // Un pedido de otra cuenta no se muestra aquí.
  if (!order || (order.userId && order.userId !== user?.id)) return <NotFound />;

  const [first, ...rest] = order.contact.name.split(/\s+/);

  return (
    <div className="page-container pb-24 pt-14">
      <div className="mx-auto max-w-[760px] text-center">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sara-ink text-white">
          <Check size={30} strokeWidth={1.6} />
        </span>
        <span className="eyebrow mt-10">Pedido recibido</span>
        <h1 className="mt-6 text-5xl tracking-[-0.03em] md:text-6xl">¡Gracias, {first}!</h1>
        <p className="mt-6 text-[14px] leading-7 text-sara-stone">{nextSteps(order)}</p>
        <p className="mt-2 text-[12px] text-sara-stone">Enviamos el detalle a {order.contact.email}.</p>

        <div className="mt-10 inline-block border border-sara-ink px-10 py-5">
          <p className="text-[10px] uppercase tracking-[0.2em] text-sara-stone">Código de pedido</p>
          <p className="mt-2 font-display text-4xl tracking-[0.04em]">{order.code}</p>
        </div>
        <p className="mt-4 text-[11px] text-sara-stone">Guárdalo: lo necesitas para consultar tu pedido.</p>
      </div>

      {!isAuthenticated && (
        <div className="mx-auto mt-14 flex max-w-[760px] flex-wrap items-center justify-between gap-6 bg-sara-cream px-8 py-7">
          <div>
            <p className="text-2xl">Guarda tus datos para la próxima</p>
            <p className="mt-1 text-[12px] text-sara-stone">
              Crea una cuenta con estos datos y verás este pedido en tu historial.
            </p>
          </div>
          <Link
            to="/registro"
            state={{
              from: '/cuenta/pedidos',
              prefill: { name: first, lastName: rest.join(' '), email: order.contact.email, phone: order.contact.phone },
            }}
            className="btn-primary"
          >
            Crear cuenta
          </Link>
        </div>
      )}

      <div className="mt-16">
        <DetallesOrden order={order} />
      </div>

      <div className="mt-14 flex flex-wrap justify-center gap-4">
        <Link to="/catalogo" className="btn-outline">
          Seguir comprando
        </Link>
        {isAuthenticated ? (
          <Link to={`/cuenta/pedidos/${order.code}`} className="btn-primary">
            Ver en mis pedidos
          </Link>
        ) : (
          <Link to="/seguimiento" className="btn-primary">
            Seguir mi pedido
          </Link>
        )}
      </div>
    </div>
  );
}