import { Link } from 'react-router-dom';
import OrderTimeLine from './OrderTimeLine';
import { COLORS, formatPrice } from '../../catalogo/variable/ProductVariable';
import OrderTotals from '../../Carro/variables/OrderTotal';
import { PAYMENT_STATUS, paymentLabel, SHIPPING } from '../../../../data/DatosCuenta';
import { MAP_ADDRESS } from '../../nosotros/variables/NosVariable';
import { STORE_INFO } from '../../../../data/site';

const Block = ({ title, children }) => (
  <div className="border-t border-sara-line pt-6">
    <h3 className="font-sans text-[12px] font-semibold uppercase tracking-[0.14em]">{title}</h3>
    <div className="mt-4 text-[13px] leading-7 text-sara-stone">{children}</div>
  </div>
);

// Detalle completo de un pedido (confirmación, seguimiento y panel del cliente).
export default function DetallesOrden({ order }) {
  if (!order) {
    return (
      <div className="py-12 text-center text-sara-stone">
        <p>No se encontró la información del pedido.</p>
      </div>
    );
  }

  const { delivery, payment, contact } = order;
  const home = delivery?.type === 'domicilio';

  return (
    <div className="grid gap-12 lg:grid-cols-[1fr_380px]">
      <div className="space-y-8">
        <Block title="Estado del pedido">
          <OrderTimeLine order={order} />
        </Block>

        <Block title={`Productos (${order?.items.reduce((n, i) => n + i.qty, 0)})`}>
          <ul className="divide-y divide-sara-line">
            {order?.items.map((item, i) => (
              <li key={`${item.productId}-${item.size}-${item.color}-${i}`} className="flex gap-4 py-4 first:pt-0">
                <div className="h-24 w-20 shrink-0 overflow-hidden bg-sara-sand">
                  <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                </div>
                <div className="flex-1">
                  <Link to={`/producto/${item.productId}`} className="block text-2xl leading-tight text-sara-ink">
                    {item.name}
                  </Link>
                  <p className="mt-1 text-[12px]">
                    Talla {item.size} · {COLORS.find((c) => c.id === item.color)?.label ?? item.color} · {item.qty}{' '}
                    {item.qty === 1 ? 'unidad' : 'unidades'}
                    {item.badge && (
                      <span className="ml-2 bg-sara-ink px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-white">
                        {item.badge}
                      </span>
                    )}
                  </p>
                </div>
                <p className="text-[14px] text-sara-ink">{formatPrice(item.unit * item.qty)}</p>
              </li>
            ))}
          </ul>
        </Block>
      </div>

      <aside className="space-y-8">
        <div className="bg-sara-mist px-7 py-7">
          <OrderTotals totals={order?.totals} />
        </div>

        <Block title={home ? 'Envío a domicilio' : 'Retiro en tienda'}>
          {home ? (
            <>
              <p className="text-sara-ink">{delivery?.address.street}</p>
              <p>{delivery?.address.district}</p>
              {delivery?.address.reference && <p>Ref.: {delivery?.address.reference}</p>}
              <p className="mt-2">Entrega estimada: {SHIPPING.homeEta}</p>
            </>
          ) : (
            <>
              <p className="text-sara-ink">{MAP_ADDRESS}</p>
              <p>{STORE_INFO.hours}</p>
              <p className="mt-2">Lleva tu código de pedido y tu DNI.</p>
            </>
          )}
        </Block>

        <Block title="Pago">
          <p className="text-sara-ink">{paymentLabel(payment.method, delivery?.type)}</p>
          <p>{PAYMENT_STATUS[payment.status]}</p>
          {payment.method === 'tarjeta' && payment.detail && (
            <p>
              {payment.detail.brand} terminada en {payment.detail.last4}
            </p>
          )}
          {(payment.method === 'yape' || payment.method === 'plin') && payment.detail && (
            <p>N.º de operación: {payment.detail.operation}</p>
          )}
        </Block>

        <Block title="Contacto">
          <p className="text-sara-ink">{contact.name}</p>
          <p>{contact.email}</p>
          <p>{contact.phone}</p>
          {contact.doc && <p>DNI {contact.doc}</p>}
        </Block>
      </aside>
    </div>
  );
}