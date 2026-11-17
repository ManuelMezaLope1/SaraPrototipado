// Datos de la página Colecciones. Reemplaza las imágenes por las tuyas.

const u = (id:any, w = 1400) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const COLLECTIONS_INTRO = {
  eyebrow: 'Temporada 2026',
  title: 'Colecciones para cada momento',
  text: 'Descubre selecciones pensadas para combinar fácilmente, renovar tu estilo y vestir a toda la familia.',
};

// `featured: true` => bloque grande con panel oscuro. Las demás se alternan imagen izquierda/derecha.
export const COLLECTIONS = [
  {
    id: 'nuevos-comienzos',
    number: '01',
    title: 'Nuevos comienzos',
    text: 'Siluetas relajadas, capas ligeras y una paleta serena. Una colección creada para construir looks actuales sin complicaciones.',
    image: '/inicio/hero.webp',
    featured: true,
    cta: 'Ver la colección',
  },
  {
    id: 'esenciales-urbanos',
    number: '02',
    title: 'Esenciales urbanos',
    text: 'Prendas cómodas y versátiles para acompañar el ritmo de cada día.',
    image: '/inicio/ropa.webp',
    grayscale: true,
    cta: 'Explorar productos',
  },
  {
    id: 'neutros-de-temporada',
    number: '03',
    title: 'Neutros de temporada',
    text: 'Una selección de texturas suaves y tonos fáciles de combinar.',
    image: '/producto/ropa1.webp',
    grayscale: true,
    cta: 'Explorar productos',
  },
  {
    id: 'pequenos-con-estilo',
    number: '04',
    title: 'Pequeños con estilo',
    text: 'Básicos resistentes y modernos para los más pequeños de la familia.',
    image: '/producto/ropa2.webp',
    cta: 'Explorar productos',
  },
];

export const COLLECTIONS_CTA = {
  eyebrow: 'Tu estilo, a tu manera',
  title: 'Encuentra las prendas que hablan de ti.',
  button: { label: 'Ver todo el catálogo', to: '/catalogo' },
};

// Qué productos pertenecen a cada colección (id de producto -> id de colección).
// Se usa en el Catálogo con /catalogo?coleccion=<id>.
export const PRODUCT_COLLECTION = {
  1: 'esenciales-urbanos',
  2: 'esenciales-urbanos',
  3: 'nuevos-comienzos',
  4: 'nuevos-comienzos',
  5: 'neutros-de-temporada',
  6: 'neutros-de-temporada',
  7: 'pequenos-con-estilo',
  8: 'esenciales-urbanos',
};

export const getCollectionById = (id:any) => COLLECTIONS.find((c) => c.id === id);
export const collectionLink = (id:any) => `/catalogo?coleccion=${id}`;