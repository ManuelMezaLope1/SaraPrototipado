import { Link } from 'react-router-dom';
import Productos from '../../catalogo/partes/Productos';
import { useStore } from '../../../../contexto/TiendaContexto';
import { products } from '../../catalogo/variable/ProductVariable';
import TituloPanel from '../variables/TituloPanel';

export default function CuentaFavoritos() {
  const { favorites } = useStore();
  const items = products.filter((p) => favorites.includes(p.id));

  return (
    <div>
      <TituloPanel eyebrow="Tu selección" title="Favoritos" />
      {items.length === 0 ? (
        <div className="mt-10 border border-dashed border-sara-line px-6 py-20 text-center">
          <p className="text-[14px] text-sara-stone">Aún no has guardado ningún producto.</p>
          <Link to="/catalogo" className="btn-primary mt-8">
            Explorar catálogo
          </Link>
        </div>
      ) : (
        <Productos items={items} className="mt-10 xl:grid-cols-3" />
      )}
    </div>
  );
}