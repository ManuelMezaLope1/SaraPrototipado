import { useState } from 'react';
import Field, { inputClass } from '../../../data/Field';
import { DISTRICTS } from '../../../data/DatosCuenta';
import { useAuth } from '../../../contexto/AuthContexto';
import TituloPanel from '../variables/TItuloPanel';
import { Plus } from 'lucide-react';

const EMPTY = { label: 'Casa', street: '', district: '', reference: '', isDefault: false };

function AddressForm({ initial, onCancel, onSave }) {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const next = {};
    if (form.street.trim().length < 5) next.street = 'Ingresa la dirección completa.';
    if (!form.district) next.district = 'Selecciona un distrito.';
    setErrors(next);
    if (Object.keys(next).length) return;
    onSave({ ...form, label: form.label.trim() || 'Dirección', street: form.street.trim(), reference: form.reference.trim() });
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-5 border border-sara-ink px-6 py-6 sm:grid-cols-2">
      <Field label="Nombre (Casa, Trabajo…)" htmlFor="ad-label">
        <input id="ad-label" value={form.label} onChange={set('label')} className={inputClass(false)} />
      </Field>
      <Field label="Distrito" htmlFor="ad-district" error={errors.district}>
        <select id="ad-district" value={form.district} onChange={set('district')} className={inputClass(errors.district)}>
          <option value="">Selecciona…</option>
          {DISTRICTS.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Dirección" htmlFor="ad-street" error={errors.street} className="sm:col-span-2">
        <input id="ad-street" value={form.street} onChange={set('street')} placeholder="Av. / Calle y número, dpto." className={inputClass(errors.street)} />
      </Field>
      <Field label="Referencia (opcional)" htmlFor="ad-ref" className="sm:col-span-2">
        <input id="ad-ref" value={form.reference} onChange={set('reference')} className={inputClass(false)} />
      </Field>
      <label className="flex cursor-pointer items-center gap-3 text-[12px] sm:col-span-2">
        <input
          type="checkbox"
          checked={form.isDefault}
          onChange={(e) => setForm((f) => ({ ...f, isDefault: e.target.checked }))}
          className="h-4 w-4 accent-black"
        />
        Usar como dirección principal
      </label>
      <div className="flex items-center gap-5 sm:col-span-2">
        <button type="submit" className="btn-primary">
          Guardar dirección
        </button>
        <button type="button" onClick={onCancel} className="border-b border-sara-ink pb-0.5 text-[12px] font-semibold">
          Cancelar
        </button>
      </div>
    </form>
  );
}

export default function Direcciones() {
  const { user, saveAddress, removeAddress, setDefaultAddress } = useAuth();
  const [editing, setEditing] = useState(null); // null | 'new' | address
  const addresses = user.addresses ?? [];

  const handleSave = async (address) => {
    await saveAddress(address);
    setEditing(null);
  };

  return (
    <div>
      <TituloPanel eyebrow="Entrega" title="Direcciones">
        {editing === null && (
          <button type="button" onClick={() => setEditing('new')} className="btn-outline">
            <Plus size={16} strokeWidth={1.8} />
            Agregar dirección
          </button>
        )}
      </TituloPanel>

      <div className="mt-8 space-y-5">
        {editing && (
          <AddressForm
            key={editing === 'new' ? 'new' : editing.id}
            initial={editing === 'new' ? EMPTY : editing}
            onCancel={() => setEditing(null)}
            onSave={(a) => handleSave(editing === 'new' ? a : { ...a, id: editing.id })}
          />
        )}

        {addresses.length === 0 && !editing && (
          <div className="border border-dashed border-sara-line px-6 py-16 text-center text-[13px] text-sara-stone">
            Aún no guardaste ninguna dirección. Las usarás para el envío a domicilio.
          </div>
        )}

        {addresses.map((a) => (
          <article key={a.id} className="flex flex-wrap items-start justify-between gap-5 border border-sara-line px-6 py-5">
            <div className="text-[13px] leading-6">
              <p className="flex items-center gap-3">
                <span className="text-2xl">{a.label}</span>
                {a.isDefault && (
                  <span className="bg-sara-ink px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white">
                    Principal
                  </span>
                )}
              </p>
              <p className="mt-1 text-sara-stone">
                {a.street}, {a.district}
              </p>
              {a.reference && <p className="text-sara-stone">Ref.: {a.reference}</p>}
            </div>
            <div className="flex flex-wrap items-center gap-5 text-[12px] font-semibold">
              {!a.isDefault && (
                <button type="button" onClick={() => setDefaultAddress(a.id)} className="border-b border-sara-ink pb-0.5">
                  Hacer principal
                </button>
              )}
              <button type="button" onClick={() => setEditing(a)} className="border-b border-sara-ink pb-0.5">
                Editar
              </button>
              <button type="button" onClick={() => removeAddress(a.id)} className="border-b border-red-700 pb-0.5 text-red-700">
                Eliminar
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}