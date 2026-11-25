import { Link } from "react-router-dom";
import { Heart, Menu, ShoppingBag, User, X } from "lucide-react";
import { useState } from "react";
import Logo from "./partes/Logo";
import Buscador from "./partes/Buscador";
import { useStore } from "../../../contexto/TiendaContexto";
import { useCart } from "../../../contexto/CarroContexto";
import { useAuth } from "../../../contexto/AuthContexto";

export default function Header() {
    const [open, setOpen] = useState(false);
    const { favorites } = useStore();
    const { count } = useCart();
    const { user, isAuthenticated } = useAuth();

    return (
        <header className="sticky top-0 z-40 border-b border-sara-line bg-white/95 backdrop-blur">
            <div className="mx-auto flex h-[64px] w-full max-w-[1900px] items-center gap-6 px-5 md:h-[76px] md:px-10 xl:px-[100px]">
                <Logo className="shrink-0 xl:mr-8" />

                <Buscador className="hidden w-full max-w-[400px] md:flex" />

                <Link to={"inicio"}>Inicio</Link>
                <Link to={"catalogo"}>Catálogo</Link>
                <Link to={"colecciones"}>Colecciones</Link>
                <Link to={"promociones"}>Promociones</Link>
                <Link to={"nosotros"}>Nuestra Tienda</Link>
                <Link to={"dashboard"}>Dashboard</Link>

                <div className="ml-auto flex items-center gap-4 sm:gap-5 lg:ml-6">
                    <Link to={"favoritos"} className="relative" aria-label={`Favoritos (${favorites.length})`}>
                        <Heart size={24} strokeWidth={1.5} />
                        {favorites.length > 0 && (
                            <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-sara-ink px-1 text-[10px] font-semibold text-white">
                                {favorites.length}
                            </span>
                        )}
                    </Link>
                    <Link to={"carrito"} className="relative" aria-label={`Carrito (${count})`}>
                        <ShoppingBag size={24} strokeWidth={1.5} />
                        {count > 0 && (
                            <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-sara-ink px-1 text-[10px] font-semibold text-white">
                                {count}
                            </span>
                        )}
                    </Link>
                    <Link
                        to={isAuthenticated ? '/cuenta' : '/login'}
                        className="relative"
                        aria-label={isAuthenticated ? `Mi cuenta (${user.name})` : 'Iniciar sesión'}
                        title={isAuthenticated ? `Hola, ${user.name}` : 'Iniciar sesión'}
                    >
                        <User size={24} strokeWidth={1.5} />
                        {isAuthenticated && (
                            <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-sara-ink" />
                        )}
                    </Link>
                    <button
                        type="button"
                        className="lg:hidden"
                        onClick={() => setOpen((v) => !v)}
                        aria-expanded={open}
                        aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
                    >
                        {open ? <X size={26} strokeWidth={1.5} /> : <Menu size={26} strokeWidth={1.5} />}
                    </button>
                </div>
            </div>
        </header>

    );
}