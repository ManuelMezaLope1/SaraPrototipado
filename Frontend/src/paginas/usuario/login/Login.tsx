import { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexto/AuthContexto';
import { isEmail } from '../../../data/Validadores';
import AuthShell from './variables/AuthShell';
import Field, { inputClass, PasswordInput } from '../../../data/Field';


export default function Login() {
  const { login, isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from ?? '/cuenta';

  const [form, setForm] = useState({ email: '', password: '', remember: true });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) return <Navigate to={from} replace />;

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const next = {};
    if (!isEmail(form.email)) next.email = 'Ingresa un correo válido.';
    if (!form.password) next.password = 'Ingresa tu contraseña.';
    setErrors(next);
    setFormError('');
    if (Object.keys(next).length) return;

    setLoading(true);
    const res = await login(form);
    setLoading(false);
    if (res.ok) navigate(from, { replace: true });
    else setFormError(res.error);
  };

  return (
    <AuthShell
      eyebrow="Bienvenido de vuelta"
      title="Iniciar sesión"
      subtitle={
        from === '/checkout'
          ? 'Ingresa para usar tus datos guardados en la compra.'
          : 'Ingresa a tu cuenta para ver tus pedidos y favoritos.'
      }
      footer={
        <>
          ¿Aún no tienes cuenta?{' '}
          <Link to="/registro" state={{ from }} className="border-b border-sara-ink pb-0.5 font-semibold text-sara-ink">
            Crear cuenta
          </Link>
          {from === '/checkout' && (
            <>
              {' '}
              o{' '}
              <Link to="/checkout" className="border-b border-sara-ink pb-0.5 font-semibold text-sara-ink">
                continuar como invitado
              </Link>
            </>
          )}
        </>
      }
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        <Field label="Correo electrónico" htmlFor="login-email" error={errors.email}>
          <input
            id="login-email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={set('email')}
            placeholder="tucorreo@ejemplo.com"
            className={inputClass(errors.email)}
          />
        </Field>

        <Field label="Contraseña" htmlFor="login-password" error={errors.password}>
          <PasswordInput
            id="login-password"
            value={form.password}
            onChange={set('password')}
            error={errors.password}
            autoComplete="current-password"
            placeholder="Tu contraseña"
          />
        </Field>

        <div className="flex items-center justify-between text-[12px]">
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              checked={form.remember}
              onChange={(e) => setForm((f) => ({ ...f, remember: e.target.checked }))}
              className="h-4 w-4 accent-black"
            />
            Recordarme
          </label>
          <Link to="/recuperar" className="border-b border-sara-ink pb-0.5 font-semibold">
            ¿Olvidaste tu contraseña?
          </Link>
        </div>

        {formError && (
          <p role="alert" className="border border-red-200 bg-red-50 px-4 py-3 text-[12px] text-red-700">
            {formError}
          </p>
        )}

        <button type="submit" disabled={loading} className="btn-primary w-full">
          {loading ? 'Ingresando…' : 'Ingresar'}
        </button>
      </form>
    </AuthShell>
  );
}