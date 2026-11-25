
import { useState } from "react";
import { Plus, Pencil, Trash2, X, Image as ImageIcon } from "lucide-react";

interface Coleccion {
  id: string;
  number: string;
  title: string;
  text: string;
  image: string;
  featured?: boolean;
  grayscale?: boolean;
  cta: string;
}

const COLLECTIONS_INICIALES: Coleccion[] = [
  {
    id: "nuevos-comienzos",
    number: "01",
    title: "Nuevos comienzos",
    text: "Siluetas relajadas, capas ligeras y una paleta serena.",
    image: "/inicio/hero.webp",
    featured: true,
    cta: "Ver la colección",
  },
  {
    id: "esenciales-urbanos",
    number: "02",
    title: "Esenciales urbanos",
    text: "Prendas cómodas y versátiles para acompañar el ritmo de cada día.",
    image: "/inicio/ropa.webp",
    grayscale: true,
    cta: "Explorar productos",
  },
  {
    id: "neutros-de-temporada",
    number: "03",
    title: "Neutros de temporada",
    text: "Una selección de texturas suaves y tonos fáciles de combinar.",
    image: "/producto/ropa1.webp",
    grayscale: true,
    cta: "Explorar productos",
  },
  {
    id: "pequenos-con-estilo",
    number: "04",
    title: "Pequeños con estilo",
    text: "Básicos resistentes y modernos para los más pequeños.",
    image: "/producto/ropa2.webp",
    cta: "Explorar productos",
  },
];

export default function ColeccionesExtra() {
  const [colecciones, setColecciones] = useState<Coleccion[]>(
    COLLECTIONS_INICIALES
  );

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [editando, setEditando] = useState<string | null>(null);

  const [formulario, setFormulario] = useState<Coleccion>({
    id: "",
    number: "",
    title: "",
    text: "",
    image: "",
    featured: false,
    grayscale: false,
    cta: "Explorar productos",
  });

  const abrirFormulario = (coleccion?: Coleccion) => {
    if (coleccion) {
      setFormulario({ ...coleccion });
      setEditando(coleccion.id);
    } else {
      setFormulario({
        id: "",
        number: String(colecciones.length + 1).padStart(2, "0"),
        title: "",
        text: "",
        image: "",
        featured: false,
        grayscale: false,
        cta: "Explorar productos",
      });
      setEditando(null);
    }

    setMostrarFormulario(true);
  };

  const guardarColeccion = () => {
    if (!formulario.title.trim() || !formulario.image.trim()) {
      alert("Completa el nombre y la imagen de la colección.");
      return;
    }

    if (editando) {
      setColecciones((anteriores) =>
        anteriores.map((c) =>
          c.id === editando
            ? { ...formulario, id: editando }
            : c
        )
      );
    } else {
      const nuevoId = formulario.title
        .toLowerCase()
        .trim()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

      setColecciones((anteriores) => [
        ...anteriores,
        {
          ...formulario,
          id: nuevoId,
          number: String(anteriores.length + 1).padStart(2, "0"),
        },
      ]);
    }

    setMostrarFormulario(false);
  };

  const eliminarColeccion = (id: string) => {
    if (confirm("¿Deseas eliminar esta colección?")) {
      setColecciones((anteriores) =>
        anteriores
          .filter((c) => c.id !== id)
          .map((c, index) => ({
            ...c,
            number: String(index + 1).padStart(2, "0"),
          }))
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-2xl">Colecciones</h2>
          <p className="mt-1 text-sm text-sara-stone">
            Administra las colecciones destacadas de tu tienda.
          </p>
        </div>

        <button
          onClick={() => abrirFormulario()}
          className="btn-agregar justify-center"
        >
          <Plus size={17} />
          Nueva colección
        </button>
      </div>

      {/* Lista de colecciones */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {colecciones.map((coleccion) => (
          <div
            key={coleccion.id}
            className="overflow-hidden border border-sara-line bg-white"
          >
            <div className="relative h-48 bg-sara-cream">
              <img
                src={coleccion.image}
                alt={coleccion.title}
                className={`h-full w-full object-cover ${
                  coleccion.grayscale ? "grayscale" : ""
                }`}
              />

              {coleccion.featured && (
                <span className="absolute left-3 top-3 bg-sara-ink px-3 py-1 text-[10px] uppercase tracking-wider text-white">
                  Destacada
                </span>
              )}

              <span className="absolute bottom-3 right-3 bg-white/90 px-3 py-1 text-xs font-medium text-sara-ink">
                {coleccion.number}
              </span>
            </div>

            <div className="space-y-3 p-5">
              <h3 className="text-xl">{coleccion.title}</h3>

              <p className="min-h-10 text-sm leading-relaxed text-sara-stone">
                {coleccion.text}
              </p>

              <p className="text-xs uppercase tracking-wider text-sara-brown">
                {coleccion.cta}
              </p>

              <div className="flex gap-2 border-t border-sara-line pt-4">
                <button
                  onClick={() => abrirFormulario(coleccion)}
                  className="btn-editar flex items-center justify-center gap-2"
                >
                  <Pencil size={15} />
                  Editar
                </button>

                <button
                  onClick={() => eliminarColeccion(coleccion.id)}
                  className="flex items-center justify-center border border-red-200 px-4 text-red-600 transition hover:bg-red-50"
                  title="Eliminar colección"
                >
                  <Trash2 size={17} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Formulario */}
      {mostrarFormulario && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/40 p-4">
          <div className="my-auto w-full max-w-xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-sara-line p-6">
              <div>
                <h3 className="text-xl">
                  {editando ? "Editar colección" : "Nueva colección"}
                </h3>
                <p className="mt-1 text-xs text-sara-stone">
                  Completa la información de la colección.
                </p>
              </div>

              <button
                onClick={() => setMostrarFormulario(false)}
                className="text-sara-stone hover:text-sara-ink"
              >
                <X size={21} />
              </button>
            </div>

            <div className="max-h-[70vh] space-y-4 overflow-y-auto p-6">
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-sara-stone">
                  Nombre de la colección
                </label>
                <input
                  className="input"
                  value={formulario.title}
                  onChange={(e) =>
                    setFormulario({ ...formulario, title: e.target.value })
                  }
                  placeholder="Ej. Nuevos comienzos"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-sara-stone">
                  Descripción
                </label>
                <textarea
                  className="input min-h-24 resize-y"
                  value={formulario.text}
                  onChange={(e) =>
                    setFormulario({ ...formulario, text: e.target.value })
                  }
                  placeholder="Describe la colección..."
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-sara-stone">
                  Ruta de imagen
                </label>
                <input
                  className="input"
                  value={formulario.image}
                  onChange={(e) =>
                    setFormulario({ ...formulario, image: e.target.value })
                  }
                  placeholder="/inicio/coleccion.webp"
                />

                {formulario.image && (
                  <img
                    src={formulario.image}
                    alt="Vista previa"
                    className="mt-3 h-36 w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                )}
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-sara-stone">
                  Texto del botón
                </label>
                <input
                  className="input"
                  value={formulario.cta}
                  onChange={(e) =>
                    setFormulario({ ...formulario, cta: e.target.value })
                  }
                  placeholder="Explorar productos"
                />
              </div>

              <div className="space-y-3 border-t border-sara-line pt-4">
                <label className="flex items-center gap-3 text-sm text-sara-ink">
                  <input
                    type="checkbox"
                    checked={!!formulario.featured}
                    onChange={(e) =>
                      setFormulario({
                        ...formulario,
                        featured: e.target.checked,
                      })
                    }
                    className="accent-sara-brown"
                  />
                  Mostrar como colección destacada
                </label>

                <label className="flex items-center gap-3 text-sm text-sara-ink">
                  <input
                    type="checkbox"
                    checked={!!formulario.grayscale}
                    onChange={(e) =>
                      setFormulario({
                        ...formulario,
                        grayscale: e.target.checked,
                      })
                    }
                    className="accent-sara-brown"
                  />
                  Mostrar imagen en escala de grises
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-sara-line p-6">
              <button
                onClick={() => setMostrarFormulario(false)}
                className="btn-outline"
              >
                Cancelar
              </button>

              <button
                onClick={guardarColeccion}
                className="btn-primary"
              >
                {editando ? "Guardar cambios" : "Crear colección"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}