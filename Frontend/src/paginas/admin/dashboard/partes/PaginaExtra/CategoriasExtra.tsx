
import { useState } from "react";
import { CATEGORIES } from "../../../../usuario/catalogo/variable/ProductVariable";

interface Categoria {
  id: string;
  label: string;
  nombre: string;
}

export default function CategoriasExtra() {
  const [categorias, setCategorias] = useState(CATEGORIES);
  const [nombre, setNombre] = useState("");
  const [label, setLabel] = useState("");
  const [editId, setEditId] = useState<string | null>(null);

  const guardarCategoria = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nombre.trim() || !label.trim()) return;

    const id = editId || nombre
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "-");

    if (editId) {
      setCategorias((prev) =>
        prev.map((cat) =>
          cat.id === editId ? { id, nombre, label } : cat
        )
      );
    } else {
      if (categorias.some((cat) => cat.id === id)) {
        alert("Esta categoría ya existe.");
        return;
      }

      setCategorias((prev) => [...prev, { id, nombre, label }]);
    }

    limpiarFormulario();
  };

  const editarCategoria = (cat: Categoria) => {
    setNombre(cat.nombre);
    setLabel(cat.label);
    setEditId(cat.id);
  };

  const eliminarCategoria = (id: string) => {
    if (!confirm("¿Deseas eliminar esta categoría?")) return;

    setCategorias((prev) => prev.filter((cat) => cat.id !== id));

    if (editId === id) limpiarFormulario();
  };

  const limpiarFormulario = () => {
    setNombre("");
    setLabel("");
    setEditId(null);
  };

  return (
    <div className="space-y-6">

      <div>
        <h2 className="text-2xl">Categorías</h2>
        <p className="mt-1 text-sm text-sara-stone">
          Organiza las prendas de tu catálogo.
        </p>
      </div>

      {/* Formulario */}
      <form
        onSubmit={guardarCategoria}
        className="grid gap-4 border border-sara-line bg-white p-6 md:grid-cols-3"
      >
        <div>
          <label className="mb-2 block text-xs font-semibold uppercase">
            Nombre
          </label>
          <input
            className="input"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ej. Mujer"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-xs font-semibold uppercase">
            Descripción
          </label>
          <input
            className="input"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="Ej. Ropa de mujer"
            required
          />
        </div>

        <div className="flex items-end gap-2">
          <button className="btn-primary flex-1 cursor-pointer" type="submit">
            {editId ? "Guardar cambios" : "Agregar"}
          </button>

          {editId && (
            <button
              type="button"
              onClick={limpiarFormulario}
              className="btn-outline"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      {/* Tabla */}
      <div className="overflow-x-auto border border-sara-line bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-sara-sand text-xs uppercase">
            <tr>
              <th className="p-4">ID</th>
              <th className="p-4">Nombre</th>
              <th className="p-4">Descripción</th>
              <th className="p-4 text-center">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {categorias.map((cat) => (
              <tr key={cat.id} className="border-t border-sara-line">
                <td className="p-4 text-sara-stone">{cat.id}</td>
                <td className="p-4 font-medium">{cat.nombre}</td>
                <td className="p-4">{cat.label}</td>
                <td className="p-4">
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => editarCategoria(cat)}
                      className="text-sara-brown hover:underline">
                      Editar
                    </button>
                    <button
                      onClick={() => eliminarCategoria(cat.id)}
                      className="text-red-600 hover:underline"
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}