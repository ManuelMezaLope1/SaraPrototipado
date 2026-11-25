
import { useEffect, useRef, useState } from "react";
import { Bell, ShoppingBag, Package, AlertTriangle, XCircle, CheckCircle2, Plus } from "lucide-react";
import Modal from "../variables/Modal";

interface Producto {
    id: number;
    name: string;
    stock: number;
}

interface Pedido {
    id: number;
    cliente: string;
    total: number;
}

interface NotificacionesProps {
    productos: Producto[];
    pedidos: Pedido[];
}

interface Notificacion {
    id: string;
    tipo: "pedido" | "stock-bajo" | "agotado";
    titulo: string;
    mensaje: string;
}

export default function NotificacionesDashboard({ productos, pedidos }: NotificacionesProps) {
    const [notificacionesPedido, setNotificacionesPedido] = useState<Notificacion[]>([]);
    const [modalAbierto, setModalAbierto] = useState(false);

    const pedidosAnteriores = useRef<number[] | null>(null);

    // Detectar nuevos pedidos
    useEffect(() => {
        const idsActuales = pedidos.map((pedido) => pedido.id);
        if (pedidosAnteriores.current === null) {
            pedidosAnteriores.current = idsActuales;
            return;
        }

        const nuevosPedidos = pedidos.filter(
            (pedido) => !pedidosAnteriores.current!.includes(pedido.id)
        );

        if (nuevosPedidos.length > 0) {
            const nuevasNotificaciones = nuevosPedidos.map((pedido) => ({
                id: `pedido-${pedido.id}`,
                tipo: "pedido" as const,
                titulo: "¡Nuevo pedido recibido!",
                mensaje: `Pedido #${pedido.id} de ${pedido.cliente} por S/ ${pedido.total.toFixed(2)}`,
            }));

            setNotificacionesPedido((anteriores) => [
                ...nuevasNotificaciones,
                ...anteriores,
            ]);
        }

        pedidosAnteriores.current = idsActuales;
    }, [pedidos]);

    const notificacionesStock: Notificacion[] = productos
        .filter((producto) => producto.stock <= 5)
        .map((producto) => ({
            id: `stock-${producto.id}`,
            tipo: producto.stock === 0 ? "agotado" : "stock-bajo",
            titulo:
                producto.stock === 0
                    ? "Producto agotado"
                    : "Stock bajo",
            mensaje:
                producto.stock === 0
                    ? `${producto.name} no tiene unidades disponibles.`
                    : `${producto.name} tiene solamente ${producto.stock} unidades.`,
        }));

    const todasLasNotificaciones = [
        {
            id: 1,
            tipo: "pedido",
            titulo: "¡Nuevo pedido recibido!",
            mensaje: "María López realizó un nuevo pedido.",
            detalle: "Pedido #1025 · 2 Blazer estructurado · S/ 259.80",
        },
        {
            id: 2,
            tipo: "stock-bajo",
            titulo: "Stock bajo de producto",
            mensaje: "Blazer estructurado está llegando al límite mínimo.",
            detalle: "Stock actual: 5 unidades · Stock mínimo: 5",
        },
        {
            id: 3,
            tipo: "agotado",
            titulo: "¡Producto agotado!",
            mensaje: "Blazer estructurado no tiene unidades disponibles.",
            detalle: "Stock actual: 0 unidades · Sin existencias",
        }
    ];

    return (
        <>
            <div className="space-y-6">
                <div>
                    <div className="mt-3 flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl">Notificaciones</h1>
                            <p className="mt-2 text-sm text-sara-stone">
                                Mantente al tanto de los pedidos y del inventario.
                            </p>
                        </div>

                        <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-sara-sand">
                            <Bell size={22} className="text-sara-brown" />
                            {todasLasNotificaciones.length > 0 && (
                                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-sara-blush px-1 text-xs text-white">
                                    {todasLasNotificaciones.length}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Lista de notificaciones */}
                <div className="space-y-3">
                    {todasLasNotificaciones.length === 0 ? (
                        <div className="border border-sara-line bg-white px-6 py-14 text-center">
                            <CheckCircle2
                                size={38}
                                className="mx-auto text-sara-brown"
                            />
                            <h2 className="mt-4 text-xl">Todo está en orden</h2>
                            <p className="mt-2 text-sm text-sara-stone">
                                No tienes nuevas notificaciones ni alertas de stock.
                            </p>
                        </div>
                    ) : (
                        todasLasNotificaciones.map((notificacion) => (
                            <div
                                key={notificacion.id}
                                className="flex items-start gap-4 border border-sara-line bg-white p-5"
                            >
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sara-cream">
                                    {notificacion.tipo === "pedido" && (
                                        <ShoppingBag size={20} className="text-sara-brown" />
                                    )}

                                    {notificacion.tipo === "stock-bajo" && (
                                        <AlertTriangle size={20} className="text-sara-brown" />
                                    )}

                                    {notificacion.tipo === "agotado" && (
                                        <XCircle size={20} className="text-red-600" />
                                    )}
                                </div>

                                <div className="min-w-0 flex-1">
                                    <h3 className="font-semibold text-sara-ink">
                                        {notificacion.titulo}
                                    </h3>
                                    <p className="mt-1 text-sm text-sara-stone">
                                        {notificacion.mensaje}
                                    </p>
                                    <span className="mt-2 inline-block text-xs uppercase tracking-wider text-sara-stone">
                                        {notificacion.tipo === "pedido"
                                            ? "Pedidos"
                                            : "Inventario"}
                                    </span>
                                </div>

                                {notificacion.tipo === "pedido" && (
                                    <button className="text-sara-stone transition hover:text-sara-ink cursor-pointer" title="Descartar notificación" onClick={() => setModalAbierto(true)}>
                                        <Plus size={19} />
                                    </button>
                                )}

                                {notificacion.tipo !== "pedido" && (
                                    <Package size={19} className="shrink-0 text-sara-stone" />
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>

            <Modal abierto={modalAbierto} onCerrar={() => setModalAbierto(false)} titulo="Detalles del producto">
                <div className="text-sm text-slate-600">
                    <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
                        <div>
                            <p className="text-xs text-sara-stone">N.º de pedido</p>
                            <p className="mt-1 font-semibold text-sara-ink">#1025</p>
                        </div>

                        <div>
                            <p className="text-xs text-sara-stone">Cliente</p>
                            <p className="mt-1 font-semibold text-sara-ink">María López</p>
                        </div>

                        <div>
                            <p className="text-xs text-sara-stone">Producto</p>
                            <p className="mt-1 font-medium text-sara-ink">Blazer estructurado</p>
                        </div>

                        <div>
                            <p className="text-xs text-sara-stone">Cantidad</p>
                            <p className="mt-1 font-medium text-sara-ink">2 unidades</p>
                        </div>

                        <div className="col-span-2 border-t border-sara-line pt-3">
                            <p className="text-xs text-sara-stone">Total del pedido</p>
                            <p className="mt-1 text-lg font-semibold text-sara-brown">S/ 259.80</p>
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex justify-end gap-3">
                    <button
                        onClick={() => setModalAbierto(false)}
                        className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50">
                        Cancelar
                    </button>

                    <button
                        onClick={() => setModalAbierto(false)}
                        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700">
                        Guardar
                    </button>
                </div>
            </Modal>
        </>
    );
}