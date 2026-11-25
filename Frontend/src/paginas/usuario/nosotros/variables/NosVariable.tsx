import { STORE_INFO } from "../../../../data/site";

// Datos de la página "Nuestra tienda". Edita aquí dirección, horarios y servicios.
const u:any = (id:any, w = 1400) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const STORE_INTRO = {
  eyebrow: 'Cerca de ti',
  title: 'Una tienda local, una atención cercana',
  text: 'Ven a conocernos, descubre las novedades y recibe ayuda personalizada para encontrar lo que necesitas.',
};

// Dirección que usan el mapa y el botón "Cómo llegar".
export const MAP_ADDRESS = 'Av. Tomás Valle 120, Independencia, Lima, Perú';

export const STORE_LOCATION = {
  eyebrow: 'Visítanos',
  name: 'Mercado Central Fevacel',
  addressLines: ['Local 24, acceso principal', 'Av. Tomás Valle 120, Independencia'],
  image: '/nosotros/fachada.webp',
  details: [
    { id: 'ubicacion', label: 'Ubicación', value: 'Mercado Central Fevacel, Local 24' },
    { id: 'telefono', label: 'Teléfono', value: STORE_INFO.phone },
    { id: 'correo', label: 'Correo', value: STORE_INFO.email },
  ],
  cta: 'Cómo llegar',
};

export const STORE_HOURS = {
  eyebrow: 'Horarios',
  title: 'Te esperamos',
  rows: [
    { day: 'Lunes a viernes', time: '10:00 — 19:00' },
    { day: 'Sábados', time: '10:00 — 18:00' },
    { day: 'Domingos', time: 'Cerrado' },
  ],
  mapLabel: 'Mapa de ubicación',
};

export const STORE_SERVICES = {
  eyebrow: 'Una mejor experiencia',
  title: 'Servicios en tienda',
  items: [
    {
      number: '01',
      title: 'Reserva y retiro',
      text: 'Reserva desde el catálogo y retira tu pedido cómodamente en nuestro local.',
    },
    {
      number: '02',
      title: 'Asesoría de tallas',
      text: 'Te ayudamos a elegir la talla y el calce adecuado para cada prenda.',
    },
    {
      number: '03',
      title: 'Cambios simples',
      text: 'Realiza cambios dentro de los 30 días presentando tu comprobante.',
    },
  ],
  cta: { label: 'Explorar catálogo', to: '/catalogo' },
};

const q = encodeURIComponent(MAP_ADDRESS);
export const mapEmbedUrl = `https://www.google.com/maps?q=${q}&output=embed`;
export const mapOpenUrl = `https://www.google.com/maps/search/?api=1&query=${q}`;
export const mapDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${q}`;