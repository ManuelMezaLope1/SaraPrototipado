import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexto/AuthContexto';
import CuentaFavoritos from './partes/CuentaFavoritos';
import { useState } from 'react';
import Resumen from './partes/Resumen';
import Pedidos from './partes/Pedidos';
import DatosPersonales from './partes/DatosPersonales';
import Direcciones from './partes/Direcciones';
import Preferencias from './partes/Preferencias';
import Reservaciones from './partes/Reservaciones';

const LINKS = [
    { id: 'resumen', label: 'Resumen' },
    { id: 'pedidos', label: 'Mis pedidos' },
    { id: 'datos', label: 'Datos personales' },
    { id: 'direcciones', label: 'Direcciones' },
    { id: 'favoritos', label: 'Favoritos' },
    { id: 'preferencias', label: 'Preferencias' },
    { id: 'reservacion', label: 'Mis Reservaciones' },
];

export default function Cuenta() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("resumen");

    const handleLogout = () => {
        logout();
        navigate('/', { replace: true });
    };

    return (
        <div className="page-container pb-24 pt-14">
            <span className="eyebrow">Mi cuenta</span>
            <h1 className="mt-6 text-5xl tracking-[-0.03em] md:text-6xl">Hola, {user.name}</h1>

            <div className="mt-12 grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-16">
                <nav aria-label="Panel de cliente" className="lg:sticky lg:top-28 lg:self-start">
                    <ul className="flex gap-2 overflow-x-auto border-b border-sara-line pb-3 lg:flex-col lg:gap-0 lg:overflow-visible lg:border-b-0 lg:pb-0">
                        {LINKS.map((tab) => (
                            <li key={tab.id} className="shrink-0">
                                <button
                                    type="button"
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`block whitespace-nowrap px-4 py-3 text-[13px] transition-colors lg:border-l-2 lg:py-3.5 cursor-pointer ${activeTab === tab.id
                                        ? "bg-sara-ink font-semibold text-white lg:border-sara-ink lg:bg-transparent lg:text-sara-ink"
                                        : "text-sara-stone hover:text-sara-ink lg:border-sara-line"
                                        }`}
                                >
                                    {tab.label}
                                </button>
                            </li>
                        ))}
                        <li className="shrink-0 lg:mt-4">
                            <button
                                type="button"
                                onClick={handleLogout}
                                className="block whitespace-nowrap px-4 py-3 text-[13px] font-semibold underline-offset-4 hover:underline lg:border-l-2 lg:border-sara-line lg:py-3.5"
                            >
                                Cerrar sesión
                            </button>
                        </li>
                    </ul>
                </nav>

                <div className="min-w-0 border-t border-sara-line py-6">
                    {activeTab === "resumen" && (<Resumen onTabChange={setActiveTab} />)}

                    {activeTab === "pedidos" && (<Pedidos />)}

                    {activeTab === "datos" && (<DatosPersonales />)}

                    {activeTab === "direcciones" && (<Direcciones />)}

                    {activeTab === "favoritos" && (<CuentaFavoritos></CuentaFavoritos>)}

                    {activeTab === "preferencias" && (<Preferencias />)}

                    {activeTab === "reservacion" && (<Reservaciones />)}
                </div>
            </div>
        </div>
    );
}