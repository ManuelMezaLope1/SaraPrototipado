import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Heart, Plus, Minus, ShoppingBag } from 'lucide-react';
import { COLORS, getProductById, products } from '../catalogo/variable/ProductVariable';
import { useCart } from '../../../contexto/CarroContexto';
import { useStore } from '../../../contexto/TiendaContexto';
import { formatPrice, getStockStatus } from './variables/DetallesVariable';
import { getPriceInfo } from '../Carro/variables/Promotion';
import Productos from '../catalogo/partes/Productos';
import GuiaTalla from './variables/GuiaTalla';

export default function DetallesProducto() {
  const { id } = useParams();
  return <ProductDetailContent key={id} id={id} />;
}

interface Acordeon {
    title: any,
    children: any
}

// Bloque desplegable (Detalles del producto / Retiro y cambios).
function Accordion({ title, children }: Acordeon) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-sara-line">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between py-6 text-left font-sans text-[14px] font-semibold"
      >
        {title}
        {open ? <Minus size={20} strokeWidth={1.5} /> : <Plus size={20} strokeWidth={1.5} />}
      </button>
      {open && <div className="pb-6 text-[13px] leading-7 text-sara-stone">{children}</div>}
    </div>
  );
}

function ProductDetailContent({ id }) {
  const product = getProductById(id);
  const { isFavorite, toggleFavorite, getStock, reserve } = useStore();
  const { addItem } = useCart();

  const [imageIndex, setImageIndex] = useState(0);
  // Como en el boceto, entra con una talla y un color ya seleccionados.
  const [size, setSize] = useState(product ? (product.sizes.includes('M') ? 'M' : product.sizes[0]) : null);
  const [color, setColor] = useState(product ? product.colors[0] : null);
  const [qty, setQty] = useState(1);
  const [feedback, setFeedback] = useState(null);
  const [guideOpen, setGuideOpen] = useState(false);

  const stock = getStock(product);
  const status = getStockStatus(stock);
  const { promo, original, final, hasDiscount } = getPriceInfo(product);
  const fav = isFavorite(product.id);
  const maxQty = Math.max(1, Math.min(stock, 5));
  const colorLabel = COLORS.find((x) => x.id === color)?.label ?? color;

  // "Completa el look": primero prendas de otras categorías, luego el resto.
  const others = products.filter((p) => p.id !== product.id);
  const related = [
    ...others.filter((p) => p.category !== product.category),
    ...others.filter((p) => p.category === product.category),
  ].slice(0, 4);

  const handleReserve = () => {
    if (!size) return setFeedback({ type: 'error', text: 'Selecciona una talla.' });
    if (!color) return setFeedback({ type: 'error', text: 'Selecciona un color.' });
    const result = reserve(product, { size, color, qty });
    if (result.ok) {
      setFeedback({ type: 'ok', text: '¡Reserva realizada! Puedes retirarla en tienda.' });
      setQty(1);
    } else {
      setFeedback({ type: 'error', text: result.error });
    }
  };

  const handleAddToCart = () => {
    if (!size) return setFeedback({ type: 'error', text: 'Selecciona una talla.' });
    if (!color) return setFeedback({ type: 'error', text: 'Selecciona un color.' });
    const result = addItem(product, { size, color, qty });
    setFeedback(
      result.ok
        ? { type: 'cart', text: 'Agregado al carrito.' }
        : { type: 'error', text: result.error }
    );
  };

  return (
    <div className="page-container pb-24">
      <Link
        to="/catalogo"
        className="mt-12 inline-flex items-center gap-3 text-[12px] font-semibold hover:text-sara-brown"
      >
        <ArrowLeft size={18} strokeWidth={1.6} />
        Volver al catálogo
      </Link>

      <div className="mt-14 grid gap-10 lg:grid-cols-[1.24fr_1fr] lg:gap-20">
        {/* Galería */}
        <div className="flex flex-col-reverse gap-4 md:flex-row md:items-start md:gap-4">
          <div className="flex gap-3 md:w-[104px] md:shrink-0 md:flex-col md:gap-4">
            {product.images.map((src, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setImageIndex(i)}
                aria-label={`Ver imagen ${i + 1}`}
                aria-current={i === imageIndex}
                className={`aspect-[4/5] w-20 overflow-hidden border md:w-full ${
                  i === imageIndex ? 'border-sara-ink' : 'border-transparent opacity-80 hover:opacity-100'
                }`}
              >
                <img src={src} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>

          <div className="relative aspect-[4/5] w-full overflow-hidden bg-sara-sand">
            <img
              src={product.images[imageIndex]}
              alt={product.name}
              className="h-full w-full object-cover"
            />
            <button
              type="button"
              onClick={() => toggleFavorite(product.id)}
              aria-pressed={fav}
              aria-label={fav ? 'Quitar de favoritos' : 'Agregar a favoritos'}
              className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/95 transition-transform hover:scale-105"
            >
              <Heart size={20} strokeWidth={1.6} className={fav ? 'fill-current' : ''} />
            </button>
          </div>
        </div>

        {/* Información */}
        <div className="lg:pt-8">
          <span className="eyebrow font-semibold">{product.eyebrow}</span>
          <h1 className="mt-6 text-5xl leading-[1.05] tracking-[-0.02em] md:text-6xl">{product.name}</h1>

          <p className="mt-8 flex flex-wrap items-baseline gap-3 text-[22px] font-light">
            {formatPrice(final)}
            {hasDiscount && (
              <span className="text-[14px] text-sara-stone line-through">{formatPrice(original)}</span>
            )}
            {promo && (
              <span className="bg-sara-ink px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-white">
                {promo.badge}
              </span>
            )}
          </p>
          {promo?.type === 'bogo' && (
            <p className="mt-2 text-[12px] text-sara-stone">Lleva dos prendas básicas y paga solo una.</p>
          )}

          <p className="mt-10 max-w-xl text-[15px] leading-8 text-sara-stone">{product.description}</p>

          <hr className="mt-10 border-sara-line" />

          {/* Talla */}
          <div className="mt-10">
            <div className="flex items-center justify-between">
              <h2 className="font-sans text-[13px] font-semibold">Selecciona tu talla</h2>
              <button
                type="button"
                onClick={() => setGuideOpen(true)}
                className="border-b border-sara-ink pb-1 text-[11px] text-sara-stone hover:text-sara-ink"
              >
                Guía de tallas
              </button>
            </div>
            <div className="mt-5 flex flex-wrap gap-4">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSize(s)}
                  aria-pressed={size === s}
                  className={`h-[53px] w-[64px] border text-[12px] ${
                    size === s
                      ? 'border-sara-ink bg-sara-dark text-white'
                      : 'border-sara-line hover:border-sara-ink'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Color */}
          <div className="mt-10">
            <h2 className="font-sans text-[13px]">
              <span className="font-semibold">Color:</span> {colorLabel}
            </h2>
            <div className="mt-5 flex flex-wrap gap-4">
              {product.colors.map((cid) => {
                const c = COLORS.find((x) => x.id === cid);
                const selected = color === cid;
                return (
                  <button
                    key={cid}
                    type="button"
                    onClick={() => setColor(cid)}
                    aria-pressed={selected}
                    aria-label={c?.label ?? cid}
                    title={c?.label ?? cid}
                    className={`flex h-[46px] w-[46px] items-center justify-center rounded-full border ${
                      selected ? 'border-sara-ink' : 'border-transparent'
                    }`}
                  >
                    <span
                      className="h-[34px] w-[34px] rounded-full border border-sara-line"
                      style={{ backgroundColor: c?.hex }}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Estado de stock */}
          <div className="mt-10 flex items-start gap-4 bg-sara-mist px-6 py-6">
            <span className={`mt-1.5 inline-block h-2.5 w-2.5 shrink-0 rounded-full ${status.dot}`} />
            <div>
              <p className="font-sans text-[12px] font-semibold">
                {stock === 0 ? status.label : `${status.label} en tienda`}
                {stock > 0 && stock <= 3 && <span className="font-normal text-sara-stone"> · quedan {stock}</span>}
              </p>
              <p className="mt-2 text-[11px] text-sara-stone">Stock actualizado hace unos minutos</p>
            </div>
          </div>

          {/* Cantidad + Reservar */}
          <div className="mt-8 flex items-stretch gap-3">
            <div className="flex shrink-0 items-center border border-sara-line" role="group" aria-label="Cantidad">
              <button
                type="button"
                className="flex h-full w-12 items-center justify-center disabled:opacity-30"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                disabled={qty <= 1 || stock === 0}
                aria-label="Disminuir cantidad"
              >
                <Minus size={16} strokeWidth={1.6} />
              </button>
              <span className="w-8 text-center text-[13px]" aria-live="polite">
                {qty}
              </span>
              <button
                type="button"
                className="flex h-full w-12 items-center justify-center disabled:opacity-30"
                onClick={() => setQty((q) => Math.min(maxQty, q + 1))}
                disabled={qty >= maxQty || stock === 0}
                aria-label="Aumentar cantidad"
              >
                <Plus size={16} strokeWidth={1.6} />
              </button>
            </div>
            <button
              type="button"
              onClick={handleReserve}
              disabled={stock === 0}
              className="btn-primary flex-1 py-6"
            >
              {stock === 0 ? 'Agotado' : 'Reservar producto'}
              {stock > 0 && <ArrowRight size={18} strokeWidth={1.8} />}
            </button>
          </div>
          <p className="mt-3 text-center text-[10px] text-sara-stone">
            Sin pago online · Te contactaremos para confirmar
          </p>

          <button
            type="button"
            onClick={handleAddToCart}
            disabled={stock === 0}
            className="btn-outline mt-6 w-full py-5"
          >
            <ShoppingBag size={18} strokeWidth={1.6} />
            Agregar al carrito
          </button>

          {feedback && (
            <p
              role="status"
              className={`mt-5 text-center text-[12px] ${feedback.type === 'error' ? 'text-red-700' : 'text-green-700'}`}
            >
              {feedback.text}{' '}
              {feedback.type === 'ok' && (
                <Link to="/reservas" className="underline">
                  Ver mis reservas
                </Link>
              )}
              {feedback.type === 'cart' && (
                <Link to="/carrito" className="underline">
                  Ver carrito
                </Link>
              )}
            </p>
          )}

          {/* Desplegables */}
          <div className="mt-8 border-t border-sara-line">
            <Accordion title="Detalles del producto">
              <ul className="list-disc space-y-1 pl-5">
                <li>Material: {product.material}</li>
                <li>Tallas disponibles: {product.sizes.join(', ')}</li>
                <li>Colores: {product.colors.map((cid) => COLORS.find((x) => x.id === cid)?.label ?? cid).join(', ')}</li>
              </ul>
            </Accordion>
            <Accordion title="Retiro y cambios">
              <p>
                Reserva online y retira tu prenda en tienda dentro de las 48 horas. Puedes probártela antes de
                comprar. Cambios de talla o color dentro de los 7 días con tu comprobante y la prenda sin uso.
              </p>
            </Accordion>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-28" aria-label="Recomendaciones para tu outfit">
          <div className="flex items-end justify-between gap-6">
            <div>
              <span className="eyebrow">Completa el look</span>
              <h2 className="mt-5 text-4xl tracking-[-0.02em] md:text-5xl">Recomendaciones para tu outfit</h2>
            </div>
            <Link
              to="/catalogo"
              className="mb-1 inline-flex shrink-0 items-center gap-3 border-b border-sara-ink pb-2 text-[12px] font-semibold"
            >
              Ver más <ArrowRight size={16} strokeWidth={1.8} />
            </Link>
          </div>
          <Productos items={related} className="mt-12 xl:grid-cols-4" />
        </section>
      )}

      {guideOpen && <GuiaTalla onClose={() => setGuideOpen(false)} />}
    </div>
  );
}