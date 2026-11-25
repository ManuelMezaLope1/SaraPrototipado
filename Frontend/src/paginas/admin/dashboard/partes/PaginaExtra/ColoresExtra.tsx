
import { useState } from "react";
import { COLORS } from "../../../../usuario/catalogo/variable/ProductVariable";

interface Color {
  id: string;
  label: string;
  hex: string;
}

export default function ColoresExtra() {
  const [colores, setColores] = useState(COLORS);
  const [nombre, setNombre] = useState("");
  const [hex, setHex] = useState("#000000");
  const [editId, setEditId] = useState<string | null>(null);

  const guardarColor = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nombre.trim() || !/^#[0-9A-Fa-f]{6}$/.test(hex)) {
      alert("Ingresa un nombre y un código HEX válido.");
      return;
    }

    const id = editId || nombre
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "-");

    if (editId) {
      setColores((prev) =>
        prev.map((color) =>
          color.id === editId
            ? { id, label: nombre, hex }
            : color
        )
      );
    } else {
      if (colores.some((c) => c.id === id)) {
        alert("Este color ya existe.");
        return;
      }

      setColores((prev) => [
        ...prev,
        { id, label: nombre, hex },
      ]);
    }

    limpiar();
  };

  const editar = (color: Color) => {
    setNombre(color.label);
    setHex(color.hex);
    setEditId(color.id);
  };

  const eliminar = (id: string) => {
    if (!confirm("¿Deseas eliminar este color?")) return;

    setColores((prev) => prev.filter((c) => c.id !== id));

    if (editId === id) limpiar();
  };

  const limpiar = () => {
    setNombre("");
    setHex("#000000");
    setEditId(null);
  };

  return (
    <div className="space-y-6">

      <div>
        <h2 className="text-2xl">Colores disponibles</h2>
        <p className="mt-1 text-sm text-sara-stone">
          Administra los colores que se utilizarán en el catálogo.
        </p>
      </div>

      {/* Formulario */}
      <form
        onSubmit={guardarColor}
        className="grid gap-4 border border-sara-line bg-white p-6 md:grid-cols-3"
      >
        <div>
          <label className="mb-2 block text-xs font-semibold uppercase">
            Nombre del color
          </label>
          <input
            className="input"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ej. Azul"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-xs font-semibold uppercase">
            Código HEX
          </label>
          <div className="flex gap-2">
            <input
              type="color"
              value={hex}
              onChange={(e) => setHex(e.target.value)}
              className="h-10 w-12 cursor-pointer border border-sara-line"
            />
            <input
              className="input"
              value={hex}
              onChange={(e) => setHex(e.target.value)}
              placeholder="#000000"
              required
            />
          </div>
        </div>

        <div className="flex items-end gap-2">
          <button type="submit" className="btn-primary flex-1">
            {editId ? "Guardar cambios" : "Agregar color"}
          </button>

          {editId && (
            <button
              type="button"
              onClick={limpiar}
              className="btn-outline"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      {/* Listado de colores */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {colores.map((color) => (
          <div
            key={color.id}
            className="flex items-center gap-4 border border-sara-line bg-white p-4"
          >
            <div
              className="h-14 w-14 shrink-0 border border-sara-line"
              style={{ backgroundColor: color.hex }}
            />

            <div className="min-w-0 flex-1">
              <p className="font-medium">{color.label}</p>
              <p className="text-xs text-sara-stone">{color.hex}</p>

              <div className="mt-2 flex gap-3 text-xs">
                <button
                  onClick={() => editar(color)}
                  className="text-sara-brown hover:underline"
                >
                  Editar
                </button>

                <button
                  onClick={() => eliminar(color.id)}
                  className="text-red-600 hover:underline"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}