import { createContext, useCallback, useContext, useEffect, useMemo } from 'react';
import useLocalStorage from '../hook/LocalStorage';
import { useStore } from './TiendaContexto';
import { useAuth } from './AuthContexto';
import { computeTotals } from '../paginas/usuario/Carro/variables/CarroVariable.';
import { CANCELABLE, STATUS_FLOW } from '../data/DatosCuenta';

// Pedidos (compras y reservas con carrito), invitados o con cuenta.
const OrderContexto = createContext(null);

const sameEmail = (a, b) => a.trim().toLowerCase() === b.trim().toLowerCase();

export function OrdersProvider({ children }) {
  const [orders, setOrders] = useLocalStorage('sara:orders', []);
  const { takeStock, returnStock } = useStore();
  const { user } = useAuth();

  // Al iniciar sesión, los pedidos hechos como invitado con el mismo correo pasan a la cuenta.
  // (En producción esto exige verificar el correo antes de vincular.)
  useEffect(() => {
    if (!user) return;
    const claimable = (o) => !o.userId && sameEmail(o.contact.email, user.email);
    setOrders((prev) =>
      prev.some(claimable) ? prev.map((o) => (claimable(o) ? { ...o, userId: user.id } : o)) : prev
    );
  }, [user, setOrders]);

  const createOrder = useCallback(
    ({ lines, contact, delivery, payment, userId }) => {
      const stock = takeStock(lines.map((l) => ({ productId: l.productId, qty: l.qty })));
      if (!stock.ok) return stock;

      const now = new Date().toISOString();
      const paidByCard = payment.method === 'tarjeta';
      const status = paidByCard ? 'confirmado' : 'pendiente';
      const seq =
        orders.reduce((max, o) => Math.max(max, parseInt(o.code.split('-')[1], 10) || 0), 1000) + 1;

      const order = {
        code: `SARA-${seq}`,
        userId: userId ?? null,
        contact,
        items: lines.map((l) => ({
          productId: l.productId,
          name: l.product.name,
          eyebrow: l.product.eyebrow,
          image: l.product.images[0],
          size: l.size,
          color: l.color,
          qty: l.qty,
          unit: l.unit,
          original: l.original,
          badge: l.promo?.badge ?? null,
        })),
        totals: computeTotals(lines, delivery.type),
        delivery,
        payment: {
          method: payment.method,
          status: paidByCard ? 'pagado' : payment.method === 'tienda' ? 'pendiente' : 'por_verificar',
          detail: payment.detail ?? null,
        },
        status,
        history: [{ status, at: now }],
        createdAt: now,
      };
      setOrders((prev) => [order, ...prev]);
      return { ok: true, order };
    },
    [orders, takeStock, setOrders]
  );

  const getOrder = useCallback((code) => orders.find((o) => o.code === code) ?? null, [orders]);

  const findOrder = useCallback(
    (code, email) =>
      orders.find(
        (o) => o.code.toLowerCase() === code.trim().toLowerCase() && sameEmail(o.contact.email, email)
      ) ?? null,
    [orders]
  );

  const cancelOrder = useCallback(
    (code) => {
      const order = orders.find((o) => o.code === code);
      if (!order || !CANCELABLE.includes(order.status)) return { ok: false };
      returnStock(order.items);
      const at = new Date().toISOString();
      setOrders((prev) =>
        prev.map((o) =>
          o.code === code
            ? {
                ...o,
                status: 'cancelado',
                payment: o.payment.status === 'pagado' ? { ...o.payment, status: 'reembolsado' } : o.payment,
                history: [...o.history, { status: 'cancelado', at }],
              }
            : o
        )
      );
      return { ok: true };
    },
    [orders, returnStock, setOrders]
  );

  // Solo para la demo: avanza el pedido al siguiente estado (la tienda lo haría desde su sistema).
  const advanceOrder = useCallback(
    (code) => {
      setOrders((prev) =>
        prev.map((o) => {
          const index = STATUS_FLOW.indexOf(o.status);
          if (o.code !== code || index < 0 || index >= STATUS_FLOW.length - 1) return o;
          const next = STATUS_FLOW[index + 1];
          const paid = o.payment.status === 'por_verificar' && next === 'confirmado';
          return {
            ...o,
            status: next,
            payment: paid ? { ...o.payment, status: 'pagado' } : o.payment,
            history: [...o.history, { status: next, at: new Date().toISOString() }],
          };
        })
      );
    },
    [setOrders]
  );

  const userOrders = useMemo(
    () => (user ? orders.filter((o) => o.userId === user.id) : []),
    [orders, user]
  );

  const value = useMemo(
    () => ({ orders, userOrders, createOrder, getOrder, findOrder, cancelOrder, advanceOrder }),
    [orders, userOrders, createOrder, getOrder, findOrder, cancelOrder, advanceOrder]
  );

  return <OrderContexto.Provider value={value}>{children}</OrderContexto.Provider>;
}

export function useOrders() {
  const ctx = useContext(OrderContexto);
  if (!ctx) throw new Error('useOrders debe usarse dentro de <OrdersProvider>');
  return ctx;
}