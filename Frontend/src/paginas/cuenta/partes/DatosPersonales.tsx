import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexto/AuthContexto';
import { isDNI, isEmail, isPasswordOk, isPhone } from '../../../data/Validadores';
import Field, { inputClass, PasswordInput } from '../../../data/Field';
import TituloPanel, { FormMessage } from '../variables/TItuloPanel';

function PersonalForm() {
  const { user, updateUser } = useAuth();
  const [form, setForm] = useState({
    name: user.name,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    doc: user.doc ?? '',
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState(null);
  const [saving, setSaving] = useState(false);
  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const next = {};
    if (form.name.trim().length < 2) next.name = 'Ingresa tu nombre.';
    if (form.lastName.trim().length < 2) next.lastName = 'Ingresa tus apellidos.';
    if (!isEmail(form.email)) next.email = 'Ingresa un correo válido.';
    if (!isPhone(form.phone)) next.phone = 'Ingresa un celular de 9 dígitos.';
    if (form.doc && !isDNI(form.doc)) next.doc = 'El DNI debe tener 8 dígitos.';
    setErrors(next);
    setMessage(null);
    if (Object.keys(next).length) return;

    setSaving(true);
    const res = await updateUser({
      name: form.name.trim(),
      lastName: form.lastName.trim(),
      email: form.email,
      phone: form.phone.trim(),
      doc: form.doc,
    });
    setSaving(false);
    if (res.ok) setMessage({ type: 'ok', text: 'Cambios guardados.' });
    else if (res.field) setErrors({ [res.field]: res.error });
    else setMessage({ type: 'error', text: res.error });
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
      <Field label="Nombre" htmlFor="p-name" error={errors.name}>
        <input id="p-name" value={form.name} onChange={set('name')} className={inputClass(errors.name)} />
      </Field>
      <Field label="Apellidos" htmlFor="p-last" error={errors.lastName}>
        <input id="p-last" value={form.lastName} onChange={set('lastName')} className={inputClass(errors.lastName)} />
      </Field>
      <Field label="Correo electrónico" htmlFor="p-email" error={errors.email}>
        <input id="p-email" type="email" value={form.email} onChange={set('email')} className={inputClass(errors.email)} />
      </Field>
      <Field label="Celular" htmlFor="p-phone" error={errors.phone}>
        <input id="p-phone" type="tel" value={form.phone} onChange={set('phone')} className={inputClass(errors.phone)} />
      </Field>
      <Field label="DNI" htmlFor="p-doc" error={errors.doc} className="sm:max-w-[calc(50%-10px)]">
        <input
          id="p-doc"
          inputMode="numeric"
          maxLength={8}
          value={form.doc}
          onChange={(e) => setForm((f) => ({ ...f, doc: e.target.value.replace(/\D/g, '') }))}
          className={inputClass(errors.doc)}
        />
      </Field>
      <div className="flex items-center gap-5 sm:col-span-2">
        <button type="submit" disabled={saving} className="btn-primary">
          {saving ? 'Guardando…' : 'Guardar cambios'}
        </button>
        <FormMessage message={message} />
      </div>
    </form>
  );
}

function PasswordForm() {
  const { changePassword } = useAuth();
  const [form, setForm] = useState({ current: '', next: '', confirm: '' });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState(null);
  const [saving, setSaving] = useState(false);
  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const next = {};
    if (!form.current) next.current = 'Ingresa tu contraseña actual.';
    if (!isPasswordOk(form.next)) next.next = 'Mínimo 8 caracteres, con letras y números.';
    if (form.confirm !== form.next) next.confirm = 'Las contraseñas no coinciden.';
    setErrors(next);
    setMessage(null);
    if (Object.keys(next).length) return;

    setSaving(true);
    const res = await changePassword(form.current, form.next);
    setSaving(false);
    if (res.ok) {
      setForm({ current: '', next: '', confirm: '' });
      setMessage({ type: 'ok', text: 'Contraseña actualizada.' });
    } else {
      setErrors({ [res.field ?? 'current']: res.error });
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="grid max-w-[460px] gap-5">
      <Field label="Contraseña actual" htmlFor="pw-current" error={errors.current}>
        <PasswordInput id="pw-current" value={form.current} onChange={set('current')} error={errors.current} autoComplete="current-password" />
      </Field>
      <Field label="Nueva contraseña" htmlFor="pw-next" error={errors.next}>
        <PasswordInput id="pw-next" value={form.next} onChange={set('next')} error={errors.next} autoComplete="new-password" showStrength />
      </Field>
      <Field label="Confirmar nueva contraseña" htmlFor="pw-confirm" error={errors.confirm}>
        <PasswordInput id="pw-confirm" value={form.confirm} onChange={set('confirm')} error={errors.confirm} autoComplete="new-password" />
      </Field>
      <div className="flex items-center gap-5">
        <button type="submit" disabled={saving} className="btn-outline">
          {saving ? 'Guardando…' : 'Cambiar contraseña'}
        </button>
        <FormMessage message={message} />
      </div>
    </form>
  );
}

function DeleteAccount() {
  const { deleteAccount } = useAuth();
  const navigate = useNavigate();
  const [confirming, setConfirming] = useState(false);

  const handleDelete = async () => {
    await deleteAccount();
    navigate('/', { replace: true });
  };

  return (
    <div>
      <p className="max-w-xl text-[13px] leading-6 text-sara-stone">
        Se eliminarán tus datos, direcciones y preferencias. Tus pedidos anteriores se conservarán en la tienda.
      </p>
      {confirming ? (
        <div className="mt-5 flex flex-wrap items-center gap-4">
          <span className="text-[13px] font-semibold">¿Seguro? No se puede deshacer.</span>
          <button type="button" onClick={handleDelete} className="bg-red-700 px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white hover:bg-red-800">
            Sí, eliminar mi cuenta
          </button>
          <button type="button" onClick={() => setConfirming(false)} className="border-b border-sara-ink pb-0.5 text-[12px] font-semibold">
            Cancelar
          </button>
        </div>
      ) : (
        <button type="button" onClick={() => setConfirming(true)} className="mt-5 border-b border-red-700 pb-0.5 text-[12px] font-semibold text-red-700">
          Eliminar mi cuenta
        </button>
      )}
    </div>
  );
}

export default function Profile() {
  return (
    <div>
      <TituloPanel eyebrow="Tu perfil" title="Datos personales" />
      <div className="mt-10">
        <PersonalForm />
      </div>

      <section className="mt-14 border-t border-sara-line pt-10" aria-label="Seguridad">
        <h3 className="text-3xl">Contraseña</h3>
        <div className="mt-6">
          <PasswordForm />
        </div>
      </section>

      <section className="mt-14 border-t border-sara-line pt-10" aria-label="Eliminar cuenta">
        <h3 className="text-3xl">Eliminar cuenta</h3>
        <div className="mt-5">
          <DeleteAccount />
        </div>
      </section>
    </div>
  );
}