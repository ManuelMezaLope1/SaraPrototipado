export const DISTRICTS = [
  'Independencia',
  'Los Olivos',
  'San Martín de Porres',
  'Comas',
  'Cercado de Lima',
  'Rímac',
  'Breña',
  'Jesús María',
  'Lince',
  'Magdalena',
  'Pueblo Libre',
  'San Miguel',
  'San Isidro',
  'Miraflores',
  'San Borja',
  'Surco',
  'La Molina',
  'San Juan de Lurigancho',
  'Ate',
  'Callao',
];

// Envío a domicilio simulado: tarifa plana y gratis desde cierto monto.
export const SHIPPING = {
  homeBase: 10,
  freeFrom: 250,
  homeEta: '24 a 48 horas',
  pickupEta: 'Listo en 24 horas',
};

// Datos para pagos con billetera digital (reemplaza por los reales de la tienda).
export const WALLET = {
  number: '987 654 321',
  holder: 'Sara Tienda Local',
};

export const PAYMENT_METHODS = [
  { id: 'tienda', label: 'Pagar en tienda' },
  { id: 'yape', label: 'Yape' },
  { id: 'plin', label: 'Plin' },
  { id: 'tarjeta', label: 'Tarjeta de crédito o débito' },
];

// "Pagar en tienda" pasa a ser "contra entrega" cuando el pedido va a domicilio.
export function paymentLabel(method, deliveryType = 'tienda') {
  if (method === 'tienda') return deliveryType === 'domicilio' ? 'Pagar contra entrega' : 'Pagar en tienda';
  return PAYMENT_METHODS.find((m) => m.id === method)?.label ?? method;
}

export const PAYMENT_STATUS = {
  pendiente: 'Pendiente de pago',
  por_verificar: 'Pago por verificar',
  pagado: 'Pagado',
  reembolsado: 'Reembolsado',
};

// Flujo normal de un pedido. "cancelado" es un estado aparte.
export const STATUS_FLOW = ['pendiente', 'confirmado', 'listo', 'entregado'];

export function statusLabel(status, deliveryType = 'tienda') {
  const labels = {
    pendiente: 'Pendiente de confirmación',
    confirmado: 'Confirmado',
    listo: deliveryType === 'domicilio' ? 'En camino' : 'Listo para retirar',
    entregado: deliveryType === 'domicilio' ? 'Entregado' : 'Retirado',
    cancelado: 'Cancelado',
  };
  return labels[status] ?? status;
}

export const CANCELABLE = ['pendiente', 'confirmado'];

export const ORDER_FILTERS = [
  { id: 'todos', label: 'Todos' },
  { id: 'proceso', label: 'En proceso', statuses: ['pendiente', 'confirmado', 'listo'] },
  { id: 'entregado', label: 'Entregados', statuses: ['entregado'] },
  { id: 'cancelado', label: 'Cancelados', statuses: ['cancelado'] },
];