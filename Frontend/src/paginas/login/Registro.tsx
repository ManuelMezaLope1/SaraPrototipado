import { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexto/AuthContexto';
import { isEmail, isPasswordOk, isPhone } from '../../data/Validadores';
import AuthShell from './variables/AuthShell';
import Field, { inputClass, PasswordInput } from '../../data/Field';


export default function Registro() {
  const { register, isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from ?? '/cuenta';
  const prefill = location.state?.prefill ?? {};

  const [form, setForm] = useState({
    name: prefill.name ?? '',
    lastName: prefill.lastName ?? '',
    email: prefill.email ?? '',
    phone: prefill.phone ?? '',
    password: '',
    confirm: '',
    terms: false,
  });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [loading, setLoading] = useState(false);

  if (isAuthenticated && !loading) return <Navigate to={from} replace />;

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const validate = () => {
    const e = {};
    if (form.name.trim().length < 2) e.name = 'Ingresa tu nombre.';
    if (form.lastName.trim().length < 2) e.lastName = 'Ingresa tus apellidos.';
    if (!isEmail(form.email)) e.email = 'Ingresa un correo válido.';
    if (!isPhone(form.phone)) e.phone = 'Ingresa un celular de 9 dígitos (ej. 987 654 321).';
    if (!isPasswordOk(form.password)) e.password = 'Mínimo 8 caracteres, con letras y números.';
    if (form.confirm !== form.password) e.confirm = 'Las contraseñas no coinciden.';
    if (!form.terms) e.terms = 'Debes aceptar los términos y la política de privacidad.';
    return e;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const next = validate();
    setErrors(next);
    setFormError('');
    if (Object.keys(next).length) return;

    setLoading(true);
    const res = await register(form);
    if (res.ok) {
      navigate(from, { replace: true });
    } else {
      setLoading(false);
      if (res.field) setErrors({ [res.field]: res.error });
      else setFormError(res.error);
    }
  };

  return (
    <AuthShell
      eyebrow="Únete a SARA"
      title="Crear cuenta"
      subtitle="Guarda tus datos, revisa tus pedidos y compra más rápido."
      footer={
        <>
          ¿Ya tienes cuenta?{' '}
          <Link to="/ingresar" state={{ from }} className="border-b border-sara-ink pb-0.5 font-semibold text-sara-ink">
            Iniciar sesión
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Nombre" htmlFor="reg-name" error={errors.name}>
            <input
              id="reg-name"
              autoComplete="given-name"
              value={form.name}
              onChange={set('name')}
              className={inputClass(errors.name)}
            />
          </Field>
          <Field label="Apellidos" htmlFor="reg-last" error={errors.lastName}>
            <input
              id="reg-last"
              autoComplete="family-name"
              value={form.lastName}
              onChange={set('lastName')}
              className={inputClass(errors.lastName)}
            />
          </Field>
        </div>

        <Field label="Correo electrónico" htmlFor="reg-email" error={errors.email}>
          <input
            id="reg-email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={set('email')}
            placeholder="tucorreo@ejemplo.com"
            className={inputClass(errors.email)}
          />
        </Field>

        <Field label="Celular" htmlFor="reg-phone" error={errors.phone}>
          <input
            id="reg-phone"
            type="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={set('phone')}
            placeholder="987 654 321"
            className={inputClass(errors.phone)}
          />
        </Field>

        <Field label="Contraseña" htmlFor="reg-pass" error={errors.password} hint="Mínimo 8 caracteres, con letras y números.">
          <PasswordInput
            id="reg-pass"
            value={form.password}
            onChange={set('password')}
            error={errors.password}
            autoComplete="new-password"
            showStrength
          />
        </Field>

        <Field label="Confirmar contraseña" htmlFor="reg-confirm" error={errors.confirm}>
          <PasswordInput
            id="reg-confirm"
            value={form.confirm}
            onChange={set('confirm')}
            error={errors.confirm}
            autoComplete="new-password"
          />
        </Field>

        <div>
          <label className="flex cursor-pointer items-start gap-3 text-[12px] leading-5 text-sara-stone">
            <input
              type="checkbox"
              checked={form.terms}
              onChange={(e) => setForm((f) => ({ ...f, terms: e.target.checked }))}
              className="mt-0.5 h-4 w-4 shrink-0 accent-black"
            />
            <span>
              Acepto los{' '}
              <Link to="/terminos" target="_blank" className="border-b border-sara-ink text-sara-ink">
                términos y condiciones
              </Link>{' '}
              y la{' '}
              <Link to="/privacidad" target="_blank" className="border-b border-sara-ink text-sara-ink">
                política de privacidad
              </Link>
              .
            </span>
          </label>
          {errors.terms && (
            <p role="alert" className="mt-1.5 text-[11px] text-red-700">
              {errors.terms}
            </p>
          )}
        </div>

        {formError && (
          <p role="alert" className="border border-red-200 bg-red-50 px-4 py-3 text-[12px] text-red-700">
            {formError}
          </p>
        )}

        <button type="submit" disabled={loading} className="btn-primary w-full">
          {loading ? 'Creando cuenta…' : 'Crear cuenta'}
        </button>
      </form>
    </AuthShell>
  );
}