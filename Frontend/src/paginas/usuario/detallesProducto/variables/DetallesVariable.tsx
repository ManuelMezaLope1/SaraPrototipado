export function getStockStatus(units) {
  if (units <= 0) return { key: 'agotado', label: 'Agotado', dot: 'bg-sara-stone/50' };
  if (units <= 3) return { key: 'ultimas', label: 'Últimas unidades', dot: 'bg-sara-ink' };
  return { key: 'disponible', label: 'Disponible', dot: 'bg-sara-ink' };
}

export const formatPrice = (value) => `S/ ${Number(value).toFixed(2)}`;