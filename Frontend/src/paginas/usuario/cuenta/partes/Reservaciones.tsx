import { Link } from 'react-router-dom';
import { useStore } from '../../../../contexto/TiendaContexto';
import { COLORS, formatPrice, getProductById } from '../../catalogo/variable/ProductVariable';
import { getPriceInfo } from '../../Carro/variables/Promotion';

export default function Reservaciones() {
  const { reservations, cancelReservation } = useStore();

  return (
    <div className="page-container pb-24 pt-14">
      <span className="eyebrow">Retiro en tienda</span>
      <h1 className="mt-6 text-6xl tracking-[-0.03em]">Mis reservas</h1>

      {reservations.length === 0 ? (
        <div className="mt-12 border border-dashed border-sara-line px-6 py-24 text-center">
          <p className="text-[14px] text-sara-stone">No tienes reservas activas.</p>
          <Link to="/catalogo" className="btn-primary mt-8">
            Explorar catálogo
          </Link>
        </div>
      ) : (
        <ul className="mt-12 divide-y divide-sara-line border-y border-sara-line">
          {reservations.map((r) => {
            const product = getProductById(r.productId);
            if (!product) return null;
            const color = COLORS.find((c) => c.id === r.color)?.label ?? r.color;
            return (
              <li key={r.id} className="flex flex-wrap items-center gap-6 py-6">
                <div className="h-28 w-24 shrink-0 overflow-hidden bg-sara-sand">
                  <img src={product.images[0]} alt={product.name} className="h-full w-full object-cover" />
                </div>
                <div className="min-w-[200px] flex-1">
                  <p className="text-[10px] uppercase tracking-[0.16em] text-sara-brown">{product.eyebrow}</p>
                  <Link to={`/producto/${product.id}`} className="mt-1 block text-2xl">
                    {product.name}
                  </Link>
                  <p className="mt-2 text-[11px] text-sara-stone">
                    Talla {r.size} · {color} · {r.qty} {r.qty === 1 ? 'unidad' : 'unidades'}
                  </p>
                </div>
                <p className="text-[14px]">{formatPrice(getPriceInfo(product).final * r.qty)}</p>
                <button
                  type="button"
                  onClick={() => cancelReservation(r.id)}
                  className="border-b border-sara-ink text-[11px] font-semibold"
                >
                  Cancelar reserva
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}