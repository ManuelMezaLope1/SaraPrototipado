import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';

// Buscador en tiempo real: escribe en la URL (?q=) y el Catálogo filtra al instante.
export default function SearchBox({ className = '' }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [params] = useSearchParams();
  const onCatalog = location.pathname === '/catalogo';
  const urlQuery = params.get('q') ?? '';

  const [term, setTerm] = useState(onCatalog ? urlQuery : '');

  // Mantiene el input sincronizado con la URL (p. ej. al usar "Restablecer")
  useEffect(() => {
    setTerm(onCatalog ? urlQuery : '');
  }, [onCatalog, urlQuery]);

  const handleChange = (e:any) => {
    const value = e.target.value;
    setTerm(value);
    const next = new URLSearchParams(onCatalog ? params : undefined);
    if (value.trim()) next.set('q', value);
    else next.delete('q');
    navigate({ pathname: '/catalogo', search: next.toString() }, { replace: onCatalog });
  };

  return (
    <form role="search" onSubmit={(e) => e.preventDefault()} className={`flex items-center gap-3 border-b border-sara-ink/70 pb-2.5 ${className}`}>
      <Search size={18} strokeWidth={1.5} className="shrink-0" aria-hidden="true" />
      <input 
      type="search" value={term} onChange={handleChange}
      placeholder="Buscar prendas, calzado…" aria-label="Buscar prendas o calzado" className="w-full bg-transparent text-[13px] outline-none placeholder:text-sara-stone/70"/>
    </form>
  );
}