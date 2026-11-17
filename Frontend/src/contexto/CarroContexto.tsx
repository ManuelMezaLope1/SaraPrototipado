import { createContext, useCallback, useContext, useMemo } from 'react';
import useLocalStorage from '../hook/LocalStorage';
import { useStore } from './TiendaContexto';
import { getProductById } from '../paginas/catalogo/variable/ProductVariable';
import { computeTotals, priceLines } from '../paginas/Carro/variables/CarroVariable.';

const CarroContexto = createContext(null);

export const MAX_PER_LINE = 5;

interface Children{
    children: any;
}

export function CartProvider({ children }: Children) {
  const [lines, setLines] = useLocalStorage('sara:cart', []);
  const { getStock } = useStore();

  // Unidades máximas que se pueden tener en una línea sin pasarse del stock.
  const maxFor = useCallback(
    (line: any, all = lines) => {
      const product = getProductById(line.productId);
      if (!product) return 0;
      const others = all
        .filter((l: any) => l.productId === line.productId && l.key !== line.key)
        .reduce((sum: any, l) => sum + l.qty, 0);
      return Math.max(0, Math.min(MAX_PER_LINE, getStock(product) - others));
    },
    [lines, getStock]
  );

  const addItem = useCallback(
    (product, { size, color, qty = 1 }) => {
      const key = `${product.id}-${size}-${color}`;
      const existing = lines.find((l: any) => l.key === key);
      const candidate = { key, productId: product.id };
      const allowed = maxFor(candidate);
      if (getStock(product) <= 0) return { ok: false, error: 'Este producto está agotado.' };
      const next = Math.min(allowed, (existing?.qty ?? 0) + qty);
      if (next <= (existing?.qty ?? 0)) {
        return { ok: false, error: 'Ya tienes en el carrito todas las unidades disponibles.' };
      }
      setLines((prev: any) =>
        existing
          ? prev.map((l) => (l.key === key ? { ...l, qty: next } : l))
          : [...prev, { key, productId: product.id, size, color, qty: next }]
      );
      return { ok: true };
    },
    [lines, maxFor, getStock, setLines]
  );

  const updateQty = useCallback(
    (key: any, qty: any) => {
      const line = lines.find((l: any) => l.key === key);
      if (!line) return;
      const next = Math.max(1, Math.min(qty, maxFor(line) || 1));
      setLines((prev: any) => prev.map((l: any) => (l.key === key ? { ...l, qty: next } : l)));
    },
    [lines, maxFor, setLines]
  );

  const removeItem = useCallback(
    (key: any) => setLines((prev: any) => prev.filter((l) => l.key !== key)),
    [setLines]
  );

  const clear = useCallback(() => setLines([]), [setLines]);

  const priced = useMemo(() => priceLines(lines), [lines]);
  const count = useMemo(() => priced.reduce((sum: any, l: any) => sum + l.qty, 0), [priced]);
  const totalsFor = useCallback((deliveryType: any) => computeTotals(priced, deliveryType), [priced]);

  const value = useMemo(
    () => ({ priced, count, addItem, updateQty, removeItem, clear, maxFor, totalsFor }),
    [priced, count, addItem, updateQty, removeItem, clear, maxFor, totalsFor]
  );

  return <CarroContexto.Provider value={value}>{children}</CarroContexto.Provider>;
}

export function useCart() {
  const ctx = useContext(CarroContexto);
  if (!ctx) throw new Error('useCart debe usarse dentro de <CartProvider>');
  return ctx;
}