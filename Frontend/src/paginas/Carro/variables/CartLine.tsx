import { Link } from 'react-router-dom';
import { Minus, Plus, X } from 'lucide-react';
import { COLORS, formatPrice } from '../../catalogo/variable/ProductVariable';

interface Carro{
    line: any;
    max: any,
    onQty: any,
    onRemove: any;
}

export default function CartLine({ line, max, onQty, onRemove }: Carro) {
  const { product } = line;
  const colorLabel = COLORS.find((c) => c.id === line.color)?.label ?? line.color;
  const hasDiscount = line.unit < line.original;

  return (
    <li className="flex gap-5 py-6 sm:gap-8">
      <Link to={`/producto/${product.id}`} className="h-36 w-28 shrink-0 overflow-hidden bg-sara-sand sm:h-40 sm:w-32">
        <img src={product.images} alt={product.name} className="h-full w-full object-cover" />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.16em] text-sara-brown">{product.eyebrow}</p>
            <Link to={`/producto/${product.id}`} className="mt-1 block text-2xl leading-tight">
              {product.name}
            </Link>
            <p className="mt-2 text-[12px] text-sara-stone">
              Talla {line.size} · {colorLabel}
              {line.promo && (
                <span className="ml-2 bg-sara-ink px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-white">
                  {line.promo.badge}
                </span>
              )}
            </p>
          </div>
          <button
            type="button"
            onClick={onRemove}
            aria-label={`Quitar ${product.name} del carrito`}
            className="text-sara-stone hover:text-sara-ink"
          >
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        <div className="mt-auto flex flex-wrap items-end justify-between gap-4 pt-4">
          <div>
            <div className="flex items-center border border-sara-line" role="group" aria-label="Cantidad">
              <button
                type="button"
                onClick={() => onQty(line.qty - 1)}
                disabled={line.qty <= 1}
                aria-label="Disminuir cantidad"
                className="flex h-10 w-10 items-center justify-center disabled:opacity-30"
              >
                <Minus size={15} strokeWidth={1.6} />
              </button>
              <span className="w-8 text-center text-[13px]" aria-live="polite">
                {line.qty}
              </span>
              <button
                type="button"
                onClick={() => onQty(line.qty + 1)}
                disabled={line.qty >= max}
                aria-label="Aumentar cantidad"
                className="flex h-10 w-10 items-center justify-center disabled:opacity-30"
              >
                <Plus size={15} strokeWidth={1.6} />
              </button>
            </div>
            {line.qty >= max && <p className="mt-1.5 text-[11px] text-sara-stone">Máximo disponible</p>}
          </div>

          <p className="text-right">
            <span className="text-[16px]">{formatPrice(line.total)}</span>
            {hasDiscount && (
              <span className="ml-2 text-[12px] text-sara-stone line-through">
                {formatPrice(line.original * line.qty)}
              </span>
            )}
            {line.qty > 1 && <span className="block text-[11px] text-sara-stone">{formatPrice(line.unit)} c/u</span>}
          </p>
        </div>
      </div>
    </li>
  );
}