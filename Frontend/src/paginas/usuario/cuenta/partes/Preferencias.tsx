import { useState } from 'react';
import { useAuth } from '../../../../contexto/AuthContexto';
import TituloPanel, { FormMessage } from '../variables/TituloPanel';
import { SIZES } from '../../catalogo/variable/ProductVariable';

export default function Preferences() {
  const { user, updateUser } = useAuth();
  const [prefs, setPrefs] = useState({
    sizes: user.prefs?.sizes ?? [],
    notifyEmail: user.prefs?.notifyEmail ?? true,
    notifyWhatsapp: user.prefs?.notifyWhatsapp ?? false,
  });
  const [message, setMessage] = useState(null);

  const toggleSize = (size) =>
    setPrefs((p) => ({
      ...p,
      sizes: p.sizes.includes(size) ? p.sizes.filter((s) => s !== size) : [...p.sizes, size],
    }));

  const handleSave = async () => {
    const res = await updateUser({ prefs });
    setMessage(res.ok ? { type: 'ok', text: 'Preferencias guardadas.' } : { type: 'error', text: res.error });
  };

  return (
    <div>
      <TituloPanel eyebrow="A tu medida" title="Preferencias" />

      <section className="mt-10" aria-label="Tallas habituales">
        <h3 className="text-3xl">Mis tallas habituales</h3>
        <p className="mt-2 text-[12px] text-sara-stone">Las usaremos para recomendarte prendas.</p>
        <div className="mt-5 flex flex-wrap gap-3">
          {SIZES.map((s) => (
            <button
              key={s}
              type="button"
              aria-pressed={prefs.sizes.includes(s)}
              onClick={() => toggleSize(s)}
              className={`h-12 min-w-14 border px-4 text-[12px] ${
                prefs.sizes.includes(s) ? 'border-sara-ink bg-sara-dark text-white' : 'border-sara-line hover:border-sara-ink'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </section>

      <section className="mt-12 border-t border-sara-line pt-10" aria-label="Notificaciones">
        <h3 className="text-3xl">Avisos sobre mis pedidos</h3>
        <div className="mt-6 space-y-4 text-[13px]">
          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              checked={prefs.notifyEmail}
              onChange={(e) => setPrefs((p) => ({ ...p, notifyEmail: e.target.checked }))}
              className="h-4 w-4 accent-black"
            />
            Recibir avisos por correo
          </label>
          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              checked={prefs.notifyWhatsapp}
              onChange={(e) => setPrefs((p) => ({ ...p, notifyWhatsapp: e.target.checked }))}
              className="h-4 w-4 accent-black"
            />
            Recibir avisos por WhatsApp
          </label>
        </div>
      </section>

      <div className="mt-10 flex items-center gap-5">
        <button type="button" onClick={handleSave} className="btn-primary">
          Guardar preferencias
        </button>
        <FormMessage message={message} />
      </div>
    </div>
  );
}