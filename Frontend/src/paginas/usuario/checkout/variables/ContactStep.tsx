import { Link } from 'react-router-dom';
import Field, { inputClass, PasswordInput } from '../../../../data/Field';


interface Cuenta {
    contact: any,
    setContact: any,
    errors: any,
    isAuthenticated: any,
    createAccount: any,
    setCreateAccount: any,
    password: any,
    setPassword: any,
    onContinue: any,
}

// Paso 1: datos de contacto (invitado o cuenta).
export default function ContactStep({
    contact,
    setContact,
    errors,
    isAuthenticated,
    createAccount,
    setCreateAccount,
    password,
    setPassword,
    onContinue,
}: Cuenta) {
    const set = (field) => (e) => setContact((c) => ({ ...c, [field]: e.target.value }));

    return (
        <div className="space-y-6">
            {!isAuthenticated && (
                <p className="bg-sara-mist px-5 py-4 text-[12px] text-sara-stone">
                    ¿Ya tienes cuenta?{' '}
                    <Link
                        to="/ingresar"
                        state={{ from: '/checkout' }}
                        className="border-b border-sara-ink pb-0.5 font-semibold text-sara-ink"
                    >
                        Inicia sesión
                    </Link>{' '}
                    para usar tus datos guardados, o continúa como invitado.
                </p>
            )}

            <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Nombre completo" htmlFor="co-name" error={errors.name} className="sm:col-span-2">
                    <input
                        id="co-name"
                        autoComplete="name"
                        value={contact.name}
                        onChange={set('name')}
                        className={inputClass(errors.name)}
                    />
                </Field>
                <Field label="Correo electrónico" htmlFor="co-email" error={errors.email} hint="Aquí enviaremos la confirmación.">
                    <input
                        id="co-email"
                        type="email"
                        autoComplete="email"
                        value={contact.email}
                        onChange={set('email')}
                        className={inputClass(errors.email)}
                    />
                </Field>
                <Field label="Celular" htmlFor="co-phone" error={errors.phone} hint="Te contactaremos para coordinar.">
                    <input
                        id="co-phone"
                        type="tel"
                        autoComplete="tel"
                        value={contact.phone}
                        onChange={set('phone')}
                        placeholder="987 654 321"
                        className={inputClass(errors.phone)}
                    />
                </Field>
                <Field label="DNI (opcional)" htmlFor="co-doc" error={errors.doc} hint="Se pedirá al retirar tu pedido." className="sm:col-span-2 sm:max-w-[calc(50%-10px)]">
                    <input
                        id="co-doc"
                        inputMode="numeric"
                        maxLength={8}
                        value={contact.doc}
                        onChange={(e) => setContact((c) => ({ ...c, doc: e.target.value.replace(/\D/g, '') }))}
                        className={inputClass(errors.doc)}
                    />
                </Field>
            </div>

            {!isAuthenticated && (
                <div className="border border-sara-line px-5 py-4">
                    <label className="flex cursor-pointer items-start gap-3 text-[13px]">
                        <input
                            type="checkbox"
                            checked={createAccount}
                            onChange={(e) => setCreateAccount(e.target.checked)}
                            className="mt-0.5 h-4 w-4 shrink-0 accent-black"
                        />
                        <span>
                            <span className="font-semibold">Crear una cuenta con estos datos</span>
                            <span className="mt-1 block text-[12px] text-sara-stone">
                                Opcional. Podrás ver el historial de tus pedidos y comprar más rápido.
                            </span>
                        </span>
                    </label>
                    {createAccount && (
                        <Field
                            label="Contraseña"
                            htmlFor="co-pass"
                            error={errors.password}
                            hint="Mínimo 8 caracteres, con letras y números."
                            className="mt-5"
                        >
                            <PasswordInput
                                id="co-pass"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                error={errors.password}
                                autoComplete="new-password"
                                showStrength
                            />
                        </Field>
                    )}
                </div>
            )}

            <button type="button" onClick={onContinue} className="btn-primary">
                Continuar a entrega
            </button>
        </div>
    );
}