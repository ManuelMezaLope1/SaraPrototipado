import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="page-container flex min-h-[55vh] flex-col items-start justify-center py-24">
      <span className="eyebrow">Error 404</span>
      <h1 className="mt-6 text-6xl tracking-[-0.03em]">Página no encontrada</h1>
      <p className="mt-6 max-w-lg text-[15px] text-sara-stone">
        La página que buscas no existe o el producto ya no está disponible.
      </p>
      <Link to="/" className="btn-primary mt-10">
        Volver al inicio
      </Link>
    </section>
  );
}