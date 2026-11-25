import { useState } from "react";
import ResumenDashboard from "./partes/ResumenDashboard";
import ProductosDashboard from "./partes/ProductosDashboard";
import ExtrasDashboard from "./partes/ExtrasDashboard";
import EntradasDashboard from "./partes/EntradasDashboard";
import NotificacionesDashboard from "./partes/NotificacionesDashboard";
import PromocionesDashboard from "./partes/PromocionesDashboard";
import HistorialesDashboard from "./partes/HistorialesDashboard";

const LINKS = [
    { id: 'resumen', label: 'Resumen' },
    { id: 'productos', label: 'Productos' },
    { id: 'promociones', label: 'Promociones' },
    { id: 'extras', label: 'Extras' },
    { id: 'entradas', label: 'Entradas' },
    { id: 'notificaciones', label: 'Notificaciones' },
    { id: 'historiales', label: 'Historiales' }
];

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState("resumen");
    
    return (
        <>
            <div className="page-container pb-24 pt-14">
                <div className="grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-16">
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
                        </ul>
                    </nav>

                    <div className="min-w-0 border-t border-sara-line py-6">
                        {activeTab === "resumen" && (<ResumenDashboard />)}
                        {activeTab === "productos" && (<ProductosDashboard />)}
                        {activeTab === "promociones" && (<PromocionesDashboard />)}
                        {activeTab === "extras" && (<ExtrasDashboard />)}
                        {activeTab==="entradas" && (<EntradasDashboard />)}
                        {activeTab==="notificaciones" && (<NotificacionesDashboard productos={[]} pedidos={[]} />)}
                        {activeTab==="historiales" && (<HistorialesDashboard />)}
                    </div>
                </div>
            </div>
        </>
    )
}