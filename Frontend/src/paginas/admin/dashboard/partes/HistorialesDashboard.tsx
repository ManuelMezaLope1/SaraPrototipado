import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import EntradasHistorial from "./PaginaHistorial/EntradasHistorial";
import SalidasHistorial from "./PaginaHistorial/SalidasHistorial";
import { useState } from "react";

interface HistorialProps {
    historialEntradaCompleto: any[];
    historialSalidaCompleto: any[];
    cantidadComprasEntrada: number;
    totalProductoEntrada: number;
    totalUnidadesEntrada: number;
    totalGeneralEntrada: number;
    cantidadComprasSalida: number;
    totalProductoSalida: number;
    totalUnidadesSalida: number;
    totalGeneralSalida: number;
    verDetallesEntrada: (id: number) => void;
    verDetallesSalida: (id: number) => void;
}

type Seccion = "entradas" | "salidas";

export default function HistorialesDashboard({
    historialEntradaCompleto,
    historialSalidaCompleto,
    cantidadComprasEntrada,
    totalProductoEntrada,
    totalUnidadesEntrada,
    totalGeneralEntrada,
    cantidadComprasSalida,
    totalProductoSalida,
    totalUnidadesSalida,
    totalGeneralSalida,
    verDetallesEntrada,
    verDetallesSalida,
}: HistorialProps) {
    const [seccion, setSeccion] = useState<Seccion>("entradas");

    const opciones = [
        {
            id: "entradas",
            nombre: "Entradas",
            icono: ArrowDownLeft,
            descripcion: "Revisa la entrada de productos",
        },
        {
            id: "salidas",
            nombre: "Salidas",
            icono: ArrowUpRight,
            descripcion: "Revisa la salida de productos",
        },
    ] as const;

    return (
        <div className="space-y-8">
            <div>
                <h1 className="mt-2 font-display text-3xl text-sara-ink">
                    Historial
                </h1>
                <p className="mt-2 text-sm text-sara-stone">
                    Consulta todos los movimientos de tu inventario.
                </p>
            </div>

            <div className="flex flex-wrap gap-3 border-b border-sara-line pb-4">
                {opciones.map((opcion) => {
                    const Icon = opcion.icono;
                    const activo = seccion === opcion.id;

                    return (
                        <button
                            key={opcion.id}
                            onClick={() => setSeccion(opcion.id)}
                            className={`flex items-center gap-3 px-5 py-3 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${activo
                                ? "bg-sara-ink text-white"
                                : "border border-sara-line text-sara-stone hover:bg-sara-sand"
                                }`}
                        >
                            <Icon size={17} />
                            {opcion.nombre}
                        </button>
                    );
                })}
            </div>

            <div>
                {seccion === "entradas" &&
                    <EntradasHistorial
                        historial={historialEntradaCompleto}
                        cantidadCompras={cantidadComprasEntrada}
                        totalProductos={totalProductoEntrada}
                        totalUnidades={totalUnidadesEntrada}
                        totalGeneral={totalGeneralEntrada}
                        verDetalles={verDetallesEntrada}
                    />
                }

                {seccion === "salidas" &&
                    <SalidasHistorial
                        historial={historialSalidaCompleto}
                        cantidadSalidas={cantidadComprasSalida}
                        totalProductos={totalProductoSalida}
                        totalUnidades={totalUnidadesSalida}
                        totalGeneral={totalGeneralSalida}
                        verDetalles={verDetallesSalida}
                    />
                }
            </div>
        </div>
    );
}