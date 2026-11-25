
import { useState } from "react";
import { Tags, Palette, Ruler } from "lucide-react";
import CategoriasExtra from "./PaginaExtra/CategoriasExtra";
import TallasExtra from "./PaginaExtra/TallasExtra";
import ColoresExtra from "./PaginaExtra/ColoresExtra";
import ColeccionesExtra from "./PaginaExtra/ColeccionesExtra";

type Seccion = "categorias" | "colecciones" | "colores" | "tallas";

export default function Extra() {
  const [seccion, setSeccion] = useState<Seccion>("categorias");

  const opciones = [
    {
      id: "categorias",
      nombre: "Categorías",
      icono: Tags,
      descripcion: "Administra las categorías de productos",
    },
    {
      id: "colecciones",
      nombre: "Colecciones",
      icono: Tags,
      descripcion: "Administra las colecciones disponibles",
    },
    {
      id: "colores",
      nombre: "Colores",
      icono: Palette,
      descripcion: "Administra los colores disponibles",
    },
    {
      id: "tallas",
      nombre: "Tallas",
      icono: Ruler,
      descripcion: "Administra las tallas disponibles",
    }
  ] as const;

  return (
    <div className="space-y-8">

      {/* Encabezado */}
      <div>
        <h1 className="mt-3 text-3xl">Extra</h1>
        <p className="mt-2 text-sm text-sara-stone">
          Gestiona las características adicionales de tu catálogo.
        </p>
      </div>

      {/* Pestañas */}
      <div className="flex flex-wrap gap-3 border-b border-sara-line pb-4">
        {opciones.map((opcion) => {
          const Icon = opcion.icono;
          const activo = seccion === opcion.id;

          return (
            <button
              key={opcion.id}
              onClick={() => setSeccion(opcion.id)}
              className={`flex items-center gap-3 px-5 py-3 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                activo
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

      {/* Contenido */}
      <div>
        {seccion === "categorias" && <CategoriasExtra />}
        {seccion === "colecciones" && <ColeccionesExtra />}
        {seccion === "colores" && <ColoresExtra />}
        {seccion === "tallas" && <TallasExtra />}
      </div>

    </div>
  );
}