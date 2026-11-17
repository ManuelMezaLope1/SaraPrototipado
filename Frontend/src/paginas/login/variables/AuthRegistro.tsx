import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../contexto/AuthContexto';

// Protege rutas privadas: sin sesión redirige a /ingresar y luego vuelve a la página pedida.
export default function RequireAuth({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/ingresar" replace state={{ from: `${location.pathname}${location.search}` }} />;
  }
  return children;
}