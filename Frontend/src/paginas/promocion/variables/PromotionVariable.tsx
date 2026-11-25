const u = (id:any, w = 1400) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const PROMOS_INTRO = {
  eyebrow: 'Oportunidades para ti',
  title: 'Más estilo, mejor precio',
  text: 'Aprovecha beneficios especiales en prendas y calzado seleccionados. Visítanos para confirmar disponibilidad.',
};

export const PROMO_FEATURE = {
  eyebrow: 'Promoción destacada',
  value: '20%',
  title: 'en prendas seleccionadas',
  text: 'Renueva tus favoritos de temporada con precios especiales para toda la familia.',
  cta: { label: 'Ver productos', to: '/catalogo?promo=seleccion-temporada' },
  note: 'Válido hasta el 30 de junio o hasta agotar stock.',
  image: '/coleccion/ropa2.webp',
};

export const PROMOS_SECTION = {
  eyebrow: 'Beneficios vigentes',
  title: 'Promociones para aprovechar',
};

// type: 'percent' => descuento real sobre el precio; 'bogo' => 2×1 (solo etiqueta, el precio no cambia)
export const PROMOTIONS = [
  {
    id: 'seleccion-temporada',
    tag: 'Hasta agotar stock',
    value: '20%',
    badge: '−20%',
    type: 'percent',
    percent: 20,
    title: 'Selección de temporada',
    text: 'Descuento en prendas seleccionadas de mujer y hombre.',
    cta: 'Ver selección',
  },
  {
    id: 'basicos-ninos',
    tag: 'Solo esta semana',
    value: '2×1',
    badge: '2×1',
    type: 'bogo',
    title: 'Básicos para niños',
    text: 'Lleva dos prendas básicas y paga solo una.',
    cta: 'Ver selección',
  },
  {
    id: 'ultimos-pares',
    tag: 'Unidades limitadas',
    value: '−30%',
    badge: '−30%',
    type: 'percent',
    percent: 30,
    title: 'Últimos pares',
    text: 'Precios especiales en calzado de temporadas anteriores.',
    cta: 'Ver selección',
  },
];

export const PROMO_STEPS = [
  {
    number: '01',
    title: 'Elige tus favoritos',
    text: 'Explora nuestro catálogo y encuentra los productos en promoción.',
  },
  {
    number: '02',
    title: 'Reserva online',
    text: 'Déjanos tus datos para apartar el producto sin realizar un pago.',
  },
  {
    number: '03',
    title: 'Retira en tienda',
    text: 'Visítanos en Mercado Central Fevacel y confirma tu compra.',
  },
];

// Qué productos entran en cada promoción (id de producto -> id de promoción).
export const PRODUCT_PROMO = {
  1: 'seleccion-temporada',
  3: 'seleccion-temporada',
  4: 'seleccion-temporada',
  5: 'seleccion-temporada',
  7: 'basicos-ninos',
  2: 'ultimos-pares',
  6: 'ultimos-pares',
};

export const getPromotionById = (id:any) => PROMOTIONS.find((p) => p.id === id);
export const promoLink = (id:any) => `/catalogo?promo=${id}`;