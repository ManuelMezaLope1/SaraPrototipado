import { ArrowDownLeft, History, Package, Boxes, Wallet, Eye, Info } from "lucide-react";

interface Movimiento {
    id: number;
    fecha: string;
    cantidad_productos: number;
    cantidad_unidades: number;
    total: number;
}

interface HistorialEntradasProps {
    historial: Movimiento[];
    cantidadCompras: number;
    totalProductos: number;
    totalUnidades: number;
    totalGeneral: number;
    verDetalles: (id: number) => void;
}

export default function EntradasHistorial({
    historial,
    cantidadCompras=9,
    totalProductos=10,
    totalUnidades=14,
    totalGeneral=50,
    verDetalles,
}: HistorialEntradasProps) {

    const indicadores = [
        { label: "Registros", valor: cantidadCompras, icon: History },
        { label: "Productos", valor: totalProductos, icon: Package },
        { label: "Unidades", valor: totalUnidades, icon: Boxes },
        { label: "Total", valor: `S/ ${Number(totalGeneral).toFixed(2)}`, icon: Wallet },
    ];

    return (
        <section className="overflow-hidden border border-sara-line bg-white">
            <div className="flex items-center gap-3 border-b border-sara-line px-6 py-5">
                <div className="flex h-11 w-11 items-center justify-center bg-green-50">
                    <ArrowDownLeft size={21} className="text-green-700" />
                </div>

                <div>
                    <h2 className="text-lg font-medium text-sara-ink">
                        Historial de entradas
                    </h2>
                    <p className="mt-1 text-xs text-sara-stone">
                        Registro de productos incorporados al inventario
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3 border-b border-sara-line bg-sara-cream/30 p-5 xl:grid-cols-4">
                {indicadores?.map((item, index) => {
                    const Icon = item.icon;

                    return (
                        <div key={index} className="border border-sara-line bg-white p-4">
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-sara-stone">{item.label}</span>
                                <Icon size={17} className="text-sara-brown" />
                            </div>

                            <p className="mt-3 text-xl font-medium text-sara-ink">
                                {item.valor}
                            </p>
                        </div>
                    );
                })}
            </div>

            {historial?.length !== 0 ? (
                <div className="px-6 py-14 text-center">
                    <Info size={30} className="mx-auto text-sara-stone" />

                    <h3 className="mt-4 text-sm font-medium text-sara-ink">
                        Sin historial de entradas
                    </h3>

                    <p className="mt-2 text-sm text-sara-stone">
                        Realiza una entrada para visualizar sus detalles.
                    </p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[600px] text-left">
                        <thead>
                            <tr className="border-b border-sara-line bg-sara-cream/40">
                                {["Fecha", "Productos", "Unidades", "Total", "Acciones"].map((titulo) => (
                                    <th key={titulo} className="px-6 py-4 text-xs font-medium uppercase tracking-wider text-sara-stone">
                                        {titulo}
                                    </th>
                                ))}
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-sara-line">
                            {historial?.map((movimiento) => (
                                <tr key={movimiento.id} className="transition hover:bg-sara-cream/30">
                                    <td className="px-6 py-4 text-sm text-sara-ink">
                                        {movimiento.fecha}
                                    </td>

                                    <td className="px-6 py-4 text-sm text-sara-ink">
                                        {movimiento.cantidad_productos}
                                    </td>

                                    <td className="px-6 py-4 text-sm text-sara-ink">
                                        {movimiento.cantidad_unidades}
                                    </td>

                                    <td className="px-6 py-4 text-sm font-medium text-sara-ink">
                                        S/ {Number(movimiento.total).toFixed(2)}
                                    </td>

                                    <td className="px-6 py-4">
                                        <button
                                            type="button"
                                            onClick={() => verDetalles(movimiento.id)}
                                            title="Ver detalles"
                                            className="flex h-9 w-9 items-center justify-center border border-sara-line text-sara-stone transition hover:border-sara-brown hover:bg-sara-cream hover:text-sara-ink"
                                        >
                                            <Eye size={17} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </section>
    );
}