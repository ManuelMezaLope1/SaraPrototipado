
import { useState } from 'react';
import { Plus, Package } from 'lucide-react';
import Modal from '../variables/Modal';
import Productos from '../../../usuario/catalogo/partes/Productos';
import { products } from '../../../usuario/catalogo/variable/ProductVariable';

export default function ProductosDashboard() {
    const [modalAbierto, setModalAbierto] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const productsPerPage = 6;
    const totalPages = Math.ceil(products.length / productsPerPage);

    // Obtener productos de la página actual
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

    const currentProducts = products.slice(
        indexOfFirstProduct,
        indexOfLastProduct
    );

    return (
        <div>
            <div className="mb-5 flex items-center justify-between">
                <h1 className="mt-3 text-3xl">Productos</h1>

                <button onClick={() => setModalAbierto(true)} className="btn-agregar">
                    <Plus size={18} />
                    Agregar producto
                </button>
            </div>

            {/* Contenido */}
            <div className="rounded-xl border border-slate-200 bg-white p-6">
                <div className="flex flex-col items-center justify-center gap-2 py-8 text-slate-400">

                    {products.length === 0
                        ?
                        <>
                            <Package size={42} strokeWidth={1.5} />
                            <p className="text-sm font-medium">
                                Gestión de productos
                            </p>
                        </>
                        :
                        <div className="text-sm font-medium">
                            <Productos items={currentProducts} isAdmin={true} />

                            {/* Paginación */}
                            <div className="mt-10 flex items-center justify-center gap-2">

                                {/* Anterior */}
                                <button
                                    onClick={() => setCurrentPage((prev) => prev - 1)}
                                    disabled={currentPage === 1}
                                    className="px-4 py-2 border border-sara-line text-sm hover:bg-sara-ink hover:text-white disabled:opacity-30 disabled:cursor-not-allowed">
                                    Anterior
                                </button>

                                {Array.from({ length: totalPages }, (_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentPage(index + 1)}
                                        className={`h-9 w-9 border text-sm transition-colors ${currentPage === index + 1
                                                ? "bg-sara-ink text-white border-sara-ink"
                                                : "border-sara-line text-sara-ink hover:bg-sara-sand"
                                            }`}>
                                        {index + 1}
                                    </button>
                                ))}

                                {/* Siguiente */}
                                <button
                                    onClick={() => setCurrentPage((prev) => prev + 1)}
                                    disabled={currentPage === totalPages || totalPages === 0}
                                    className="px-4 py-2 border border-sara-line text-sm
      hover:bg-sara-ink hover:text-white
      disabled:opacity-30 disabled:cursor-not-allowed"
                                >
                                    Siguiente
                                </button>

                            </div>

                            {/* Información */}
                            <p className="mt-4 text-center text-xs text-gray-500">
                                Mostrando {currentProducts.length > 0 ? indexOfFirstProduct + 1 : 0}
                                {" - "}
                                {indexOfFirstProduct + currentProducts.length}
                                {" de "}
                                {products.length} productos
                            </p>
                        </div>
                    }
                </div>
            </div>

            <Modal abierto={modalAbierto} onCerrar={() => setModalAbierto(false)} titulo="Registrar producto">
                <p className="text-sm text-slate-600">
                    <form action="">
                        <div className="flex">
                            <div className="p-3">
                                <label htmlFor="" className="block mb-2.5 text-sm font-medium text-heading">Nombre</label>
                                <input type="text" className="input" placeholder="Ejm. Juan" />
                            </div>

                            <div className="p-3">
                                <label htmlFor="" className="block mb-2.5 text-sm font-medium text-heading">Precio</label>
                                <input type="number" min="1" className="input" placeholder="Ejm. Perez" />
                            </div>
                        </div>

                        <div>
                            <div className="p-3">
                                <label htmlFor="" className="block mb-2.5 text-sm font-medium text-heading">Descripción</label>
                                <input type="number" min="1" className="input" placeholder="Ejm. Descripción del Producto" />
                            </div>
                        </div>

                        <div className="flex">
                            <div className="p-3">
                                <label htmlFor="" className="block mb-2.5 text-sm font-medium text-heading">Categoria</label>
                                <select name="" id="" className="select">
                                    <option value="">Selecciona una categoria</option>
                                    <option value="1">Opción 1</option>
                                    <option value="2">Opción 2</option>
                                </select>
                            </div>

                            <div className="p-3">
                                <label htmlFor="" className="block mb-2.5 text-sm font-medium text-heading">Tallas</label>
                                <select name="" id="" className="select">
                                    <option value="">Selecciona una talla</option>
                                    <option value="1">Opción 1</option>
                                    <option value="2">Opción 2</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex">
                            <div className="p-3">
                                <label htmlFor="" className="block mb-2.5 text-sm font-medium text-heading">Imágenes</label>
                                <input type="text" className="input" placeholder="Ejm. Juan" />
                            </div>

                            <div className="p-3">
                                <label htmlFor="" className="block mb-2.5 text-sm font-medium text-heading">Material</label>
                                <input type="number" min="1" className="input" placeholder="Ejm. Mezcla de poliéster y viscosa" />
                            </div>
                        </div>
                    </form>
                </p>

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
        </div>
    );
}