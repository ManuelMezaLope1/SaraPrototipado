import { createContext, useCallback, useContext, useMemo } from 'react';
import useLocalStorage from '../hook/LocalStorage';
import { getProductById } from '../paginas/catalogo/variable/ProductVariable';

const TiendaContexto = createContext(null);

const KEYS = {
  favorites: 'sara:favorites',
  stock: 'sara:stock',
  reservations: 'sara:reservations',
};

interface Children{
    children: any;
}

export function StoreProvider({ children }: Children) {
  const [favorites, setFavorites] = useLocalStorage(KEYS.favorites, []);
  const [stockOverrides, setStockOverrides] = useLocalStorage(KEYS.stock, {});
  const [reservations, setReservations] = useLocalStorage(KEYS.reservations, []);

  const isFavorite = useCallback((id:any) => favorites.includes(id), [favorites]);

  const toggleFavorite = useCallback(
    (id:any) =>
      setFavorites((prev:any) => (prev.includes(id) ? prev.filter((f:any) => f !== id) : [...prev, id])),
    [setFavorites]
  );

  const getStock = useCallback(
    (product:any) => (stockOverrides[product.id] ?? product.stock),
    [stockOverrides]
  );

  const reserve = useCallback(
    (product, { size, color, qty }) => {
      const available = stockOverrides[product.id] ?? product.stock;
      if (qty < 1 || qty > available) return { ok: false, error: 'No hay stock suficiente.' };

      setStockOverrides((prev:any) => ({ ...prev, [product.id]: available - qty }));
      setReservations((prev:any) => [
        {
          id: `${Date.now()}-${product.id}`,
          productId: product.id,
          size,
          color,
          qty,
          createdAt: new Date().toISOString(),
        },
        ...prev,
      ]);
      return { ok: true };
    },
    [stockOverrides, setStockOverrides, setReservations]
  );

  const cancelReservation = useCallback(
    (reservationId: any) => {
      const target = reservations.find((r: any) => r.id === reservationId);
      if (!target) return;
      setReservations((prev: any) => prev.filter((r: any) => r.id !== reservationId));
      setStockOverrides((prev: any) => ({
        ...prev,
        // se devuelve el stock; si no había override se parte del stock actual guardado
        [target.productId]: (prev[target.productId] ?? 0) + target.qty,
      }));
    },
    [reservations, setReservations, setStockOverrides]
  );

  // Descuenta stock al confirmar un pedido. lines: [{ productId, qty }]
  const takeStock = useCallback(
    (lines: any) => {
      const needed = {};
      lines.forEach((l: any) => {
        needed[l.productId] = (needed[l.productId] ?? 0) + l.qty;
      });
      const ids = Object.keys(needed);
      const enough = ids.every((id) => {
        const product = getProductById(Number(id));
        const available = stockOverrides[id] ?? product?.stock ?? 0;
        return needed[id] <= available;
      });
      if (!enough) return { ok: false, error: 'Uno de los productos ya no tiene stock suficiente.' };

      setStockOverrides((prev: any) => {
        const next = { ...prev };
        ids.forEach((id) => {
          const product = getProductById(Number(id));
          next[id] = (prev[id] ?? product?.stock ?? 0) - needed[id];
        });
        return next;
      });
      return { ok: true };
    },
    [stockOverrides, setStockOverrides]
  );

  // Devuelve el stock (por ejemplo al cancelar un pedido).
  const returnStock = useCallback(
    (lines: any) => {
      setStockOverrides((prev: any) => {
        const next = { ...prev };
        lines.forEach((l: any) => {
          const product = getProductById(Number(l.productId));
          next[l.productId] = (prev[l.productId] ?? product?.stock ?? 0) + l.qty;
        });
        return next;
      });
    },
    [setStockOverrides]
  );

  const value = useMemo(
    () => ({
      favorites,
      isFavorite,
      toggleFavorite,
      getStock,
      reservations,
      reserve,
      cancelReservation,
      takeStock,
      returnStock,
    }),
    [
      favorites,
      isFavorite,
      toggleFavorite,
      getStock,
      reservations,
      reserve,
      cancelReservation,
      takeStock,
      returnStock,
    ]
  );

  return <TiendaContexto.Provider value={value}>{children}</TiendaContexto.Provider>;
}

export function useStore() {
  const ctx = useContext(TiendaContexto);
  if (!ctx) throw new Error('useStore debe usarse dentro de <StoreProvider>');
  return ctx;
}
