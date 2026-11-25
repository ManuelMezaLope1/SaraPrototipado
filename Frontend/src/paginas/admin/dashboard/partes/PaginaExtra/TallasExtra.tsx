
import { useState } from "react";
import { SIZES } from "../../../../usuario/catalogo/variable/ProductVariable";

export default function TallasExtra() {
  const [tallas, setTallas] = useState(SIZES);
  const [nuevaTalla, setNuevaTalla] = useState("");
  const [editTalla, setEditTalla] = useState<string | null>(null);

  const guardarTalla = (e: React.FormEvent) => {
    e.preventDefault();

    const valor = nuevaTalla.trim().toUpperCase();

    if (!valor) return;

    if (editTalla) {
      if (tallas.some((t) => t === valor && t !== editTalla)) {
        alert("Esta talla ya existe.");
        return;
      }

      setTallas((prev) =>
        prev.map((t) => t === editTalla ? valor : t)
      );
    } else {
      if (tallas.includes(valor)) {
        alert("Esta talla ya existe.");
        return;
      }

      setTallas((prev) => [...prev, valor]);
    }

    setNuevaTalla("");
    setEditTalla(null);
  };

  const editar = (talla: string) => {
    setNuevaTalla(talla);
    setEditTalla(talla);
  };

  const eliminar = (talla: string) => {
    if (!confirm(`¿Eliminar la talla ${talla}?`)) return;

    setTallas((prev) => prev.filter((t) => t !== talla));

    if (editTalla === talla) {
      setNuevaTalla("");
      setEditTalla(null);
    }
  };

  return (
    <div className="space-y-6">

      <div>
        <h2 className="text-2xl">Tallas disponibles</h2>
        <p className="mt-1 text-sm text-sara-stone">
          Administra las tallas que podrán asignarse a los productos.
        </p>
      </div>

      <form
        onSubmit={guardarTalla}
        className="flex flex-wrap gap-3 border border-sara-line bg-white p-6"
      >
        <input
          className="input max-w-xs"
          value={nuevaTalla}
          onChange={(e) => setNuevaTalla(e.target.value)}
          placeholder="Ej. XXL o 42"
          required
        />

        <button className="btn-primary" type="submit">
          {editTalla ? "Guardar cambios" : "Agregar talla"}
        </button>

        {editTalla && (
          <button
            type="button"
            className="btn-outline"
            onClick={() => {
              setNuevaTalla("");
              setEditTalla(null);
            }}
          >
            Cancelar
          </button>
        )}
      </form>

      <div className="border border-sara-line bg-white p-6">
        <div className="mb-5 flex justify-between">
          <h3 className="text-lg">Listado de tallas</h3>
          <span className="text-sm text-sara-stone">
            {tallas.length} tallas
          </span>
        </div>

        <div className="flex flex-wrap gap-3">
          {tallas.map((talla) => (
            <div
              key={talla}
              className="flex items-center gap-3 border border-sara-line px-4 py-3"
            >
              <span className="font-medium">{talla}</span>

              <button
                onClick={() => editar(talla)}
                className="text-xs text-sara-brown hover:underline"
              >
                Editar
              </button>

              <button
                onClick={() => eliminar(talla)}
                className="text-xs text-red-600 hover:underline"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}