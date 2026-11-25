import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { passwordStrength } from './Validadores';


// Estilo común de los campos de formulario.
export const inputClass = (error) =>
  `w-full border bg-white px-4 py-3.5 text-[13px] outline-none transition-colors placeholder:text-sara-stone/60 focus:border-sara-ink disabled:bg-sara-mist ${
    error ? 'border-red-600' : 'border-sara-line'
  }`;

export default function Field({ label, htmlFor, error, hint, children, className = '' }) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="mb-2 block text-[12px] font-semibold">
        {label}
      </label>
      {children}
      {hint && !error && <p className="mt-1.5 text-[11px] text-sara-stone">{hint}</p>}
      {error && (
        <p role="alert" className="mt-1.5 text-[11px] text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}

// Campo de contraseña con botón mostrar/ocultar y medidor opcional.
export function PasswordInput({ id, value, onChange, error, autoComplete, placeholder, showStrength }) {
  const [visible, setVisible] = useState(false);
  const strength = passwordStrength(value);
  const labels = ['Muy débil', 'Débil', 'Aceptable', 'Buena', 'Fuerte'];

  return (
    <>
      <div className="relative">
        <input
          id={id}
          type={visible ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          placeholder={placeholder}
          className={`${inputClass(error)} pr-12`}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? 'Ocultar contraseña' : 'Mostrar contraseña'}
          className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-sara-stone hover:text-sara-ink"
        >
          {visible ? <EyeOff size={18} strokeWidth={1.5} /> : <Eye size={18} strokeWidth={1.5} />}
        </button>
      </div>
      {showStrength && value && (
        <div className="mt-2" aria-live="polite">
          <div className="flex gap-1">
            {[1, 2, 3, 4].map((n) => (
              <span key={n} className={`h-1 flex-1 ${strength >= n ? 'bg-sara-ink' : 'bg-sara-line'}`} />
            ))}
          </div>
          <p className="mt-1.5 text-[11px] text-sara-stone">Seguridad: {labels[strength]}</p>
        </div>
      )}
    </>
  );
}