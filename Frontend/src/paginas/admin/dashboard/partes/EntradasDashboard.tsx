import { Info, Package, Plus } from "lucide-react"

export default function EntradasDashboard() {
    return (
        <>
            <div className="space-y-8">
                <div className="border-b border-sara-line pb-5">
                    <h1 className="mt-3 text-3xl">Entradas</h1>
                    <p className="mt-2 text-sm text-sara-stone">
                        Registra el ingreso de productos al inventario de la tienda.
                    </p>
                </div>

                <div className="border border-sara-line bg-white p-6 md:p-8">
                    <div className="mb-6">
                        <h2 className="text-xl">Nueva entrada</h2>
                        <p className="mt-1 text-sm text-sara-stone">
                            Selecciona una categoría y el producto que deseas ingresar.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                        <div>
                            <label htmlFor="categoria" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-sara-stone">
                                Categoría
                            </label>

                            <select className="select w-full" name="categoria" id="categoria" required defaultValue="" >
                                <option value="">--Seleccione una categoría--</option>
                                <option value="mujer">Mujer</option>
                                <option value="hombre">Hombre</option>
                                <option value="ninos">Niños</option>
                                <option value="calzado">Calzado</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="producto" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-sara-stone" >
                                Producto
                            </label>

                            <select className="select w-full" name="producto" id="producto" defaultValue="" >
                                <option value="">
                                    --Seleccione primero una categoría--
                                </option>
                            </select>
                        </div>

                        <div className="flex items-end">
                            <button className="btn-agregar w-full justify-center">
                                <Plus size={18} /> Agregar producto
                            </button>
                        </div>
                    </div>
                </div>

                <div className="border border-sara-line bg-white">
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-sara-line px-6 py-5">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center bg-sara-sand">
                                <Package size={20} className="text-sara-brown" />
                            </div>

                            <div>
                                <h2 className="text-lg">Productos agregados</h2>
                                <p className="text-xs text-sara-stone">
                                    Productos incluidos en esta entrada.
                                </p>
                            </div>
                        </div>

                        <span className="border border-sara-line px-3 py-1 text-xs text-sara-stone">
                            0 productos
                        </span>
                    </div>

                    <div className="flex min-h-[280px] flex-col items-center justify-center px-6 py-12 text-center">
                        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-sara-cream">
                            <Info size={25} className="text-sara-brown" />
                        </div>

                        <h3 className="text-xl">Sin productos</h3>

                        <p className="mt-2 max-w-sm text-sm leading-relaxed text-sara-stone">
                            Agrega productos para registrar una nueva entrada.
                            Aquí aparecerán los productos seleccionados en forma de tabla.
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}