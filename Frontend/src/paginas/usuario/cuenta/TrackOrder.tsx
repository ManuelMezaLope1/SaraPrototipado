import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useOrders } from '../../../contexto/OrderContexto';
import { useAuth } from '../../../contexto/AuthContexto';
import { isEmail } from '../../../data/Validadores';
import Field, { inputClass } from '../../../data/Field';
import OrderStatusBadge from './variables/OrderStatusBadge';
import OrderDetails from '../checkout/variables/DetallesOrden';
import { formatDate } from '../../../data/Format';

// Seguimiento para invitados: código de pedido + correo.
export default function TrackOrder() {
  const [params] = useSearchParams();
  const { findOrder } = useOrders();
  const { isAuthenticated } = useAuth();
  const [form, setForm] = useState({ code: params.get('codigo') ?? '', email: '' });
  const [errors, setErrors] = useState({});
  const [order, setOrder] = useState(null);
  const [notFound, setNotFound] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const next = {};
    if (!/^sara-\d+$/i.test(form.code.trim())) next.code = 'Ingresa tu código (ej. SARA-1001).';
    if (!isEmail(form.email)) next.email = 'Ingresa el correo usado en la compra.';
    setErrors(next);
    setNotFound(false);
    setOrder(null);
    if (Object.keys(next).length) return;

    const found = findOrder(form.code, form.email);
    if (found) setOrder(found);
    else setNotFound(true);
  };

  return (
    <div className="page-container pb-24 pt-14">
      <div className="mx-auto max-w-[560px] text-center">
        <span className="eyebrow">Sin necesidad de cuenta</span>
        <h1 className="mt-6 text-5xl tracking-[-0.03em] md:text-6xl">Seguir mi pedido</h1>
        <p className="mt-5 text-[14px] leading-7 text-sara-stone">
          Ingresa el código que recibiste al comprar y el correo que usaste.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="mx-auto mt-10 grid max-w-[560px] gap-5 text-left sm:grid-cols-2">
        <Field label="Código de pedido" htmlFor="track-code" error={errors.code}>
          <input
            id="track-code"
            value={form.code}
            onChange={(e) => setForm((f) => ({ ...f, code: e.target.value.toUpperCase() }))}
            placeholder="SARA-1001"
            className={inputClass(errors.code)}
          />
        </Field>
        <Field label="Correo electrónico" htmlFor="track-email" error={errors.email}>
          <input
            id="track-email"
            type="email"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            className={inputClass(errors.email)}
          />
        </Field>
        <button type="submit" className="btn-primary sm:col-span-2">
          Consultar pedido
        </button>
      </form>

      {notFound && (
        <p role="alert" className="mx-auto mt-8 max-w-[560px] border border-red-200 bg-red-50 px-5 py-4 text-center text-[12px] text-red-700">
          No encontramos un pedido con esos datos. Revisa el código y el correo.
        </p>
      )}

      {isAuthenticated && !order && (
        <p className="mt-8 text-center text-[12px] text-sara-stone">
          Si compraste con tu cuenta, también puedes verlo en{' '}
          <Link to="/cuenta" className="border-b border-sara-ink font-semibold text-sara-ink">
            Mis pedidos
          </Link>
          .
        </p>
      )}

      {order && (
        <div className="mt-16">
          <div className="mb-10 flex flex-wrap items-center justify-between gap-4 border-b border-sara-line pb-6">
            <div>
              <p className="font-display text-4xl">{order.code}</p>
              <p className="mt-1 text-[12px] text-sara-stone">Realizado el {formatDate(order.createdAt)}</p>
            </div>
            <OrderStatusBadge status={order.status} deliveryType={order.delivery.type} />
          </div>
          <OrderDetails order={order} />
        </div>
      )}
    </div>
  );
}