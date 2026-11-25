const u = (id:any, w = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const CATEGORIES = [
  { id: 'mujer', label: 'Ropa de mujer', nombre: 'Mujer' },
  { id: 'hombre', label: 'Ropa de hombre', nombre: 'Hombre' },
  { id: 'ninos', label: 'Niños', nombre: 'Niños' },
  { id: 'calzado', label: 'Calzado', nombre: 'Calzado' },
];

export const SIZES = ['XS', 'S', 'M', 'L', 'XL', '36', '38', '40'];

export const COLORS = [
  { id: 'negro', label: 'Negro', hex: '#1c1b1a' },
  { id: 'blanco', label: 'Blanco', hex: '#f6f4ef' },
  { id: 'beige', label: 'Beige', hex: '#d9cdb8' },
  { id: 'gris', label: 'Gris', hex: '#9a9a98' },
];

export const PRICE_RANGE = { min: 50, max: 300, step: 10 };

export const SORT_OPTIONS = [
  { id: 'relevancia', label: 'Relevancia' },
  { id: 'precio-asc', label: 'Precio: menor a mayor' },
  { id: 'precio-desc', label: 'Precio: mayor a menor' },
  { id: 'nombre', label: 'Nombre (A–Z)' },
];

export const products = [
  {
    id: 1,
    name: 'Blazer estructurado',
    category: 'mujer',
    eyebrow: 'Mujer · Chaquetas',
    price: 129.9,
    stock: 12,
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['gris', 'beige'],
    images: ['/producto/ropa1.webp'],
    description:
      'Blazer de corte estructurado con cuadros sutiles. Una pieza versátil que funciona tanto para la oficina como para una salida casual.',
    material: 'Mezcla de poliéster y viscosa',
  },
  {
    id: 2,
    name: 'Zapatilla urbana',
    category: 'calzado',
    eyebrow: 'Calzado · Unisex',
    price: 119.9,
    stock: 3,
    sizes: ['36', '38', '40'],
    colors: ['beige', 'negro'],
    images: ['/producto/ropa2.webp'],
    description:
      'Zapatilla de lona de caña baja, suela de goma y plantilla acolchada. Cómoda para todo el día.',
    material: 'Lona y suela de goma',
  },
  {
    id: 3,
    name: 'Camisa fluida',
    category: 'mujer',
    eyebrow: 'Mujer · Camisas',
    price: 79.9,
    stock: 20,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['blanco', 'beige'],
    images: ['/producto/ropa3.webp'],
    description:
      'Camisa de caída fluida y tacto suave. Se combina fácil con jeans, faldas o pantalones sastre.',
    material: '100% lino',
  },
  {
    id: 4,
    name: 'Pantalón relaxed fit',
    category: 'hombre',
    eyebrow: 'Hombre · Pantalones',
    price: 99.9,
    stock: 15,
    sizes: ['M', 'L', 'XL'],
    colors: ['negro', 'gris'],
    images: ['/producto/ropa4.webp'],
    description:
      'Pantalón de corte relajado, cintura cómoda y caída recta. Ideal para el día a día.',
    material: 'Algodón con elastano',
  },
  {
    id: 5,
    name: 'Vestido midi',
    category: 'mujer',
    eyebrow: 'Mujer · Vestidos',
    price: 109.9,
    stock: 9,
    sizes: ['XS', 'S', 'M'],
    colors: ['blanco', 'negro'],
    images: ['/producto/ropa5.webp'],
    description:
      'Vestido midi de línea limpia y silueta elegante. Para eventos, cenas o una tarde en la ciudad.',
    material: 'Crepé ligero',
  },
  {
    id: 6,
    name: 'Botín de piel',
    category: 'calzado',
    eyebrow: 'Calzado · Mujer',
    price: 159.9,
    stock: 2,
    sizes: ['36', '38'],
    colors: ['beige', 'gris'],
    images: ['/producto/ropa6.webp'],
    description:
      'Botín de piel de acabado ante con elástico lateral. Calce cómodo y estilo atemporal.',
    material: 'Piel ante',
  },
  {
    id: 7,
    name: 'Sudadera básica',
    category: 'ninos',
    eyebrow: 'Niños · Básicos',
    price: 59.9,
    stock: 18,
    sizes: ['S', 'M', 'L'],
    colors: ['beige', 'gris', 'blanco'],
    images: ['/producto/ropa7.webp'],
    description:
      'Sudadera suave y resistente para los más pequeños. Fácil de lavar y perfecta para jugar.',
    material: 'Algodón perchado',
  },
  {
    id: 8,
    name: 'Mocasín clásico',
    category: 'calzado',
    eyebrow: 'Calzado · Hombre',
    price: 139.9,
    stock: 0,
    sizes: ['38', '40'],
    colors: ['negro'],
    images: ['/producto/ropa8.webp'],
    description:
      'Mocasín clásico de horma cómoda y acabado pulido. Un básico que nunca pasa de moda.',
    material: 'Cuero sintético',
  },
];

export const formatPrice = (value:any) => `S/ ${Number(value).toFixed(2)}`;
export const getProductById = (id: any) => products.find((p) => String(p.id) === String(id));