export const HERO = {
  eyebrow: 'Nueva temporada · 2026',
  titleLines: ['Estilo que se adapta', 'a tu día a día.'],
  text: 'Prendas versátiles, cómodas y actuales para ti y toda tu familia.',
  cta: { label: 'Explorar catálogo', to: '/catalogo' },
  image: 'inicio/hero.webp',
  imageCaption: 'Editorial · Nueva temporada',
  badge: { value: '20%', label: 'Dscto. selección' },
};

export const FEATURED_CATEGORIES = [
  {
    id: 'ropa',
    title: 'Ropa',
    subtitle: 'Descubrir colección',
    to: '/catalogo?cat=mujer,hombre,ninos',
    image: 'inicio/ropa.webp',
    grayscale: true,
  },
  {
    id: 'calzado',
    title: 'Calzado',
    subtitle: 'Ver todos los modelos',
    to: '/catalogo?cat=calzado',
    image: 'inicio/calzado.webp',
    grayscale: false,
  },
];

export const BENEFITS = [
  { title: 'Compra fácil', text: 'Reserva online y retira en tienda' },
  { title: 'Atención cercana', text: 'Te ayudamos a encontrar tu talla' },
  { title: 'Moda accesible', text: 'Novedades a precios para todos' },
];