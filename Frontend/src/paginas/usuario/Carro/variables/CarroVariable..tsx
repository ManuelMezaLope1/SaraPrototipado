import { SHIPPING } from "../../../../data/DatosCuenta";
import { getProductById } from "../../catalogo/variable/ProductVariable";
import { getPriceInfo } from "./Promotion";


const r2 = (n) => Math.round(n * 100) / 100;

// Agrega a cada línea del carrito el producto y su precio con promoción.
export function priceLines(lines) {
  return lines
    .map((line) => {
      const product = getProductById(line.productId);
      if (!product) return null;
      const { promo, original, final } = getPriceInfo(product);
      return { ...line, product, promo, original, unit: final, total: r2(final * line.qty) };
    })
    .filter(Boolean);
}

// Totales del carrito. Aplica el descuento en % (ya incluido en `unit`),
// el 2×1 (cada segunda unidad más barata es gratis) y el costo de envío.
export function computeTotals(priced, deliveryType = 'tienda') {
  const original = r2(priced.reduce((sum, l) => sum + l.original * l.qty, 0));
  const subtotal = r2(priced.reduce((sum, l) => sum + l.total, 0));
  const percentSavings = r2(original - subtotal);

  const bogoUnits = priced
    .filter((l) => l.promo?.type === 'bogo')
    .flatMap((l) => Array(l.qty).fill(l.unit))
    .sort((a, b) => b - a);
  const bogoSavings = r2(bogoUnits.slice(Math.ceil(bogoUnits.length / 2)).reduce((s, n) => s + n, 0));

  const merchandise = r2(subtotal - bogoSavings);
  const shipping =
    deliveryType === 'domicilio' && priced.length > 0
      ? merchandise >= SHIPPING.freeFrom
        ? 0
        : SHIPPING.homeBase
      : 0;

  return {
    original,
    subtotal,
    percentSavings,
    bogoSavings,
    savings: r2(percentSavings + bogoSavings),
    merchandise,
    shipping,
    total: r2(merchandise + shipping),
  };
}
