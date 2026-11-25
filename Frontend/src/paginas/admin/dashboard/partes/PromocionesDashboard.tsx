
import { useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Tag,
  CalendarDays,
  Percent,
  Power,
} from "lucide-react";

interface Promocion {
  id: number;
  nombre: string;
  tipo: "general" | "categoria" | "producto";
  descuento: number;
  objetivo: string;
  fechaInicio: string;
  fechaFin: string;
  activa: boolean;
}

const PROMOCIONES_INICIALES: Promocion[] = [
  {
    id: 1,
    nombre: "Black Friday",
    tipo: "general",
    descuento: 30,
    objetivo: "Todos los productos",
    fechaInicio: "2026-11-20",
    fechaFin: "2026-11-30",
    activa: true,
  },
  {
    id: 2,
    nombre: "Especial Sara",
    tipo: "categoria",
    descuento: 15,
    objetivo: "Ropa de mujer",
    fechaInicio: "2026-11-01",
    fechaFin: "2026-11-30",
    activa: true,
  },
  {
    id: 3,
    nombre: "Nueva temporada",
    tipo: "producto",
    descuento: 20,
    objetivo: "Blazer estructurado",
    fechaInicio: "2026-12-01",
    fechaFin: "2026-12-15",
    activa: false,
  },
];

export default function PromocionesDashboard() {
  const [promociones, setPromociones] =
    useState<Promocion[]>(PROMOCIONES_INICIALES);

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [editando, setEditando] = useState<number | null>(null);

  const formularioInicial: Promocion = {
    id: 0,
    nombre: "",
    tipo: "producto",
    descuento: 10,
    objetivo: "",
    fechaInicio: "",
    fechaFin: "",
    activa: true,
  };

  const [formulario, setFormulario] =
    useState<Promocion>(formularioInicial);

  const abrirFormulario = (promocion?: Promocion) => {
    if (promocion) {
      setFormulario({ ...promocion });
      setEditando(promocion.id);
    } else {
      setFormulario({
        ...formularioInicial,
        id: 0,
      });
      setEditando(null);
    }

    setMostrarFormulario(true);
  };

  const guardarPromocion = () => {
    if (
      !formulario.nombre.trim() ||
      !formulario.objetivo.trim() ||
      !formulario.fechaInicio ||
      !formulario.fechaFin
    ) {
      alert("Completa todos los campos.");
      return;
    }

    if (formulario.descuento <= 0 || formulario.descuento > 100) {
      alert("El descuento debe estar entre 1% y 100%.");
      return;
    }

    if (formulario.fechaFin < formulario.fechaInicio) {
      alert("La fecha de finalización no puede ser anterior al inicio.");
      return;
    }

    if (editando !== null) {
      setPromociones((anteriores) =>
        anteriores.map((p) =>
          p.id === editando ? { ...formulario, id: editando } : p
        )
      );
    } else {
      const nuevaPromocion = {
        ...formulario,
        id:
          promociones.length > 0
            ? Math.max(...promociones.map((p) => p.id)) + 1
            : 1,
      };

      setPromociones((anteriores) => [
        ...anteriores,
        nuevaPromocion,
      ]);
    }

    setMostrarFormulario(false);
    setFormulario(formularioInicial);
    setEditando(null);
  };

  const eliminarPromocion = (id: number) => {
    if (confirm("¿Deseas eliminar esta promoción?")) {
      setPromociones((anteriores) =>
        anteriores.filter((p) => p.id !== id)
      );
    }
  };

  const cambiarEstado = (id: number) => {
    setPromociones((anteriores) =>
      anteriores.map((p) =>
        p.id === id ? { ...p, activa: !p.activa } : p
      )
    );
  };

  const activas = promociones.filter((p) => p.activa).length;

  const obtenerEstado = (promocion: Promocion) => {
    if (!promocion.activa) return "Inactiva";

    const hoy = new Date().toLocaleDateString("en-CA", {
      timeZone: "America/Lima",
    });

    if (hoy < promocion.fechaInicio) return "Programada";
    if (hoy > promocion.fechaFin) return "Vencida";

    return "Activa";
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="mt-3 text-3xl">Promociones</h1>
          <p className="mt-2 text-sm text-sara-stone">
            Administra los descuentos y promociones de tu tienda.
          </p>
        </div>

        <button onClick={() => abrirFormulario()} className="btn-agregar justify-center">
          <Plus size={17} />
          Nueva promoción
        </button>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="border border-sara-line bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-sara-stone">
              Total promociones
            </p>
            <Tag size={20} className="text-sara-brown" />
          </div>
          <h2 className="mt-3 text-3xl">{promociones.length}</h2>
        </div>

        <div className="border border-sara-line bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-sara-stone">
              Promociones activas
            </p>
            <Percent size={20} className="text-sara-brown" />
          </div>
          <h2 className="mt-3 text-3xl">{activas}</h2>
        </div>

        <div className="border border-sara-line bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-sara-stone">
              Promociones programadas
            </p>
            <CalendarDays size={20} className="text-sara-brown" />
          </div>
          <h2 className="mt-3 text-3xl">
            {promociones.filter((p) => obtenerEstado(p) === "Programada").length}
          </h2>
        </div>
      </div>

      {/* Listado */}
      <div className="border border-sara-line bg-white">
        <div className="border-b border-sara-line px-6 py-5">
          <h2 className="text-xl">Listado de promociones</h2>
          <p className="mt-1 text-sm text-sara-stone">
            Gestiona las promociones disponibles en tu tienda.
          </p>
        </div>

        {promociones.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <Tag size={36} className="mx-auto text-sara-stone" />
            <h3 className="mt-4 text-lg">Sin promociones</h3>
            <p className="mt-2 text-sm text-sara-stone">
              Todavía no has registrado ninguna promoción.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-sara-line">
            {promociones.map((promocion) => {
              const estado = obtenerEstado(promocion);

              return (
                <div
                  key={promocion.id}
                  className="flex flex-col justify-between gap-5 p-5 transition hover:bg-sara-cream/40 md:flex-row md:items-center"
                >
                  {/* Información */}
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-sara-sand">
                      <Tag size={21} className="text-sara-brown" />
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-semibold text-sara-ink">
                          {promocion.nombre}
                        </h3>

                        <span
                          className={`rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wider ${
                            estado === "Activa"
                              ? "bg-green-100 text-green-700"
                              : estado === "Programada"
                              ? "bg-blue-100 text-blue-700"
                              : estado === "Vencida"
                              ? "bg-red-100 text-red-700"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {estado}
                        </span>
                      </div>

                      <p className="mt-1 text-sm text-sara-stone">
                        {promocion.objetivo}
                      </p>

                      <p className="mt-2 text-xs text-sara-stone">
                        {promocion.fechaInicio} — {promocion.fechaFin}
                      </p>
                    </div>
                  </div>

                  {/* Descuento y acciones */}
                  <div className="flex items-center justify-between gap-4 md:justify-end">
                    <div className="text-left md:text-right">
                      <p className="text-2xl font-semibold text-sara-brown">
                        {promocion.descuento}%
                      </p>
                      <p className="text-xs text-sara-stone">
                        de descuento
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => cambiarEstado(promocion.id)}
                        className="border border-sara-line p-2 text-sara-stone transition hover:bg-sara-sand hover:text-sara-ink cursor-pointer"
                        title="Activar / desactivar"
                      >
                        <Power size={17} />
                      </button>

                      <button
                        onClick={() => abrirFormulario(promocion)}
                        className="btn-editar flex w-auto items-center gap-2">
                        <Pencil size={15} />
                        Editar
                      </button>

                      <button
                        onClick={() => eliminarPromocion(promocion.id)}
                        className="border border-red-200 p-2 text-red-600 transition hover:bg-red-50 cursor-pointer" title="Eliminar">
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal */}
      {mostrarFormulario && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/40 p-4">
          <div className="my-auto w-full max-w-xl bg-white shadow-xl">

            <div className="flex items-center justify-between border-b border-sara-line p-6">
              <div>
                <h2 className="text-xl">
                  {editando !== null ? "Editar promoción" : "Nueva promoción"}
                </h2>
                <p className="mt-1 text-xs text-sara-stone">
                  Configura los detalles de tu oferta.
                </p>
              </div>

              <button
                onClick={() => setMostrarFormulario(false)}
                className="text-sara-stone hover:text-sara-ink"
              >
                <span className="text-xl">×</span>
              </button>
            </div>

            <div className="max-h-[70vh] space-y-5 overflow-y-auto p-6">

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-sara-stone">
                  Nombre de la promoción
                </label>
                <input
                  className="input"
                  value={formulario.nombre}
                  onChange={(e) =>
                    setFormulario({ ...formulario, nombre: e.target.value })
                  }
                  placeholder="Ej. Black Friday"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-sara-stone">
                  Tipo de promoción
                </label>
                <select
                  className="select w-full"
                  value={formulario.tipo}
                  onChange={(e) =>
                    setFormulario({
                      ...formulario,
                      tipo: e.target.value as Promocion["tipo"],
                      objetivo: "",
                    })
                  }
                >
                  <option value="general">Descuento general</option>
                  <option value="categoria">Por categoría</option>
                  <option value="producto">Por producto</option>
                </select>
              </div>

              {formulario.tipo !== "general" && (
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-sara-stone">
                    {formulario.tipo === "categoria" ? "Categoría" : "Producto"}
                  </label>

                  <input
                    className="input"
                    value={formulario.objetivo}
                    onChange={(e) =>
                      setFormulario({
                        ...formulario,
                        objetivo: e.target.value,
                      })
                    }
                    placeholder={
                      formulario.tipo === "categoria"
                        ? "Ej. Ropa de mujer"
                        : "Ej. Blazer estructurado"
                    }
                  />
                </div>
              )}

              {formulario.tipo === "general" && (
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-sara-stone">
                    Aplicación
                  </label>
                  <input
                    className="input bg-sara-cream"
                    value="Todos los productos"
                    disabled
                  />
                </div>
              )}

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-sara-stone">
                  Porcentaje de descuento
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="1"
                    max="100"
                    className="input pr-12"
                    value={formulario.descuento}
                    onChange={(e) =>
                      setFormulario({
                        ...formulario,
                        descuento: Number(e.target.value),
                      })
                    }
                  />
                  <span className="absolute right-4 top-2 text-sara-stone">
                    %
                  </span>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-sara-stone">
                    Fecha de inicio
                  </label>
                  <input
                    type="date"
                    className="input"
                    value={formulario.fechaInicio}
                    onChange={(e) =>
                      setFormulario({
                        ...formulario,
                        fechaInicio: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-sara-stone">
                    Fecha de finalización
                  </label>
                  <input
                    type="date"
                    min={formulario.fechaInicio || undefined}
                    className="input"
                    value={formulario.fechaFin}
                    onChange={(e) =>
                      setFormulario({
                        ...formulario,
                        fechaFin: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <label className="flex items-center gap-3 border-t border-sara-line pt-4 text-sm text-sara-ink">
                <input
                  type="checkbox"
                  checked={formulario.activa}
                  onChange={(e) =>
                    setFormulario({
                      ...formulario,
                      activa: e.target.checked,
                    })
                  }
                  className="accent-sara-brown"/>
                Activar promoción
              </label>

              <div className="border border-sara-line bg-sara-cream p-4">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-sara-stone">
                  Vista previa
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-sara-ink">
                      {formulario.nombre || "Nombre de promoción"}
                    </p>
                    <p className="mt-1 text-xs text-sara-stone">
                      {formulario.objetivo || "Productos seleccionados"}
                    </p>
                  </div>
                  <p className="text-2xl font-semibold text-sara-brown">
                    -{formulario.descuento}%
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-sara-line p-6">
              <button onClick={() => setMostrarFormulario(false)} className="btn-outline">
                Cancelar
              </button>

              <button onClick={guardarPromocion} className="btn-primary">
                {editando !== null ? "Guardar cambios" : "Crear promoción"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}