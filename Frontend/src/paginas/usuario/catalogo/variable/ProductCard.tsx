import { useState } from "react";
import { Link } from "react-router";
import Modal from "../../../admin/dashboard/variables/Modal";

interface ProductCardProps {
  product: any;
  isAdmin?: any;
}

export default function ProductCard({ product, isAdmin = false }: ProductCardProps) {
  const [modalAbierto, setModalAbierto] = useState(false);

  return (
    <>
      <article className="group relative bg-white transition-shadow duration-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.07)]">
        <Link to={`/catalogo/producto/${product.id}`} className="block">
          <div className="aspect-[4/5] overflow-hidden bg-sara-sand">
            <img
              src={product.images}
              alt={product.name}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-70 saturate-50"
            />
          </div>

          <div className="px-4 pb-6 pt-5 min-h-30">
            <p className="text-[10px] uppercase tracking-[0.16em] text-sara-brown">
              {product.eyebrow}
            </p>

            <div className="mt-3 flex items-baseline justify-between gap-4">
              <h3 className="text-[20px] leading-tight">{product.name}</h3>

              <span className="shrink-0 text-right text-[13px]">
                S/. {product.price}
              </span>
            </div>
          </div>
        </Link>

        {isAdmin && (
          <div className="px-4 pb-4">
            <button onClick={() => setModalAbierto(true)} className="btn-editar">
              Editar
            </button>
          </div>
        )}
      </article>

      <Modal
        abierto={modalAbierto}
        onCerrar={() => setModalAbierto(false)}
        titulo="Actualizar producto"
      >
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
    </>
  );
}