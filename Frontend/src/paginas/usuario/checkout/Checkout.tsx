import { useRef, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexto/AuthContexto';
import { useCart } from '../../../contexto/CarroContexto';
import { useOrders } from '../../../contexto/OrderContexto';
import { cardBrand, isDNI, isEmail, isExpiryValid, isPasswordOk, isPhone, luhn } from '../../../data/Validadores';
import { COLORS, formatPrice } from '../catalogo/variable/ProductVariable';
import ContactStep from './variables/ContactStep';
import DeliveryStep from './variables/DeliveryStep';
import PaymentStep from './variables/PaymentStep';
import OrderTotals from '../Carro/variables/OrderTotal';

const EMPTY_CARD = { number: '', name: '', expiry: '', cvv: '' };

interface Componentes{
    number: any;
    title: any;
    state: any;
    summary: any;
    onEdit: any;
    children: any;
}

function StepSection({ number, title, state, summary, onEdit, children }: Componentes) {
  // state: 'active' | 'done' | 'todo'
  return (
    <section className="border-b border-sara-line py-8 first:pt-0" aria-label={title}>
      <header className="flex items-center gap-4">
        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-[12px] font-semibold ${
            state === 'todo' ? 'border-sara-line text-sara-stone' : 'border-sara-ink bg-sara-ink text-white'
          }`}
        >
          {number}
        </span>
        <h2 className={`flex-1 text-3xl ${state === 'todo' ? 'text-sara-stone' : ''}`}>{title}</h2>
        {state === 'done' && (
          <button type="button" onClick={onEdit} className="border-b border-sara-ink pb-0.5 text-[12px] font-semibold">
            Editar
          </button>
        )}
      </header>
      {state === 'done' && summary && <p className="mt-3 pl-12 text-[12px] leading-6 text-sara-stone">{summary}</p>}
      {state === 'active' && <div className="mt-8 md:pl-12">{children}</div>}
    </section>
  );
}

export default function Checkout() {
  const { user, isAuthenticated, register, saveAddress } = useAuth();
  const { priced, clear, totalsFor } = useCart();
  const { createOrder } = useOrders();
  const navigate = useNavigate();
  const completed = useRef(false);

  const savedAddresses = user?.addresses ?? [];
  const defaultAddress = savedAddresses.find((a) => a.isDefault) ?? savedAddresses[0];

  const [step, setStep] = useState(1);
  const [contact, setContact] = useState({
    name: user ? `${user.name} ${user.lastName}`.trim() : '',
    email: user?.email ?? '',
    phone: user?.phone ?? '',
    doc: user?.doc ?? '',
  });
  const [createAccount, setCreateAccount] = useState(false);
  const [password, setPassword] = useState('');
  const [delivery, setDelivery] = useState({
    type: 'tienda',
    addressId: defaultAddress?.id ?? 'new',
    street: '',
    district: '',
    reference: '',
    save: false,
  });
  const [payment, setPayment] = useState({ method: 'tienda', operation: '', card: EMPTY_CARD });
  const [terms, setTerms] = useState(false);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (priced.length === 0 && !completed.current) return <Navigate to="/carrito" replace />;

  const totals = totalsFor(delivery.type);
  const selectedSaved = savedAddresses.find((a) => a.id === delivery.addressId);
  const finalAddress =
    delivery.type === 'domicilio'
      ? selectedSaved
        ? { street: selectedSaved.street, district: selectedSaved.district, reference: selectedSaved.reference ?? '' }
        : { street: delivery.street.trim(), district: delivery.district, reference: delivery.reference.trim() }
      : null;

  // ----- Validaciones por paso -----
  const validateContact = () => {
    const e = {};
    if (contact.name.trim().length < 3) e.name = 'Ingresa tu nombre completo.';
    if (!isEmail(contact.email)) e.email = 'Ingresa un correo válido.';
    if (!isPhone(contact.phone)) e.phone = 'Ingresa un celular de 9 dígitos (ej. 987 654 321).';
    if (contact.doc && !isDNI(contact.doc)) e.doc = 'El DNI debe tener 8 dígitos.';
    if (createAccount && !isAuthenticated && !isPasswordOk(password)) {
      e.password = 'Mínimo 8 caracteres, con letras y números.';
    }
    return e;
  };

  const validateDelivery = () => {
    const e = {};
    if (delivery.type === 'domicilio' && !selectedSaved) {
      if (delivery.street.trim().length < 5) e.street = 'Ingresa tu dirección completa.';
      if (!delivery.district) e.district = 'Selecciona tu distrito.';
    }
    return e;
  };

  const validatePayment = () => {
    const e = {};
    if (payment.method === 'yape' || payment.method === 'plin') {
      if (!/^\d{6,12}$/.test(payment.operation)) e.operation = 'Ingresa el número de operación (6 a 12 dígitos).';
    }
    if (payment.method === 'tarjeta') {
      const c = payment.card;
      if (!luhn(c.number)) e.number = 'El número de tarjeta no es válido.';
      if (c.name.trim().length < 3) e.cardName = 'Ingresa el nombre que aparece en la tarjeta.';
      if (!isExpiryValid(c.expiry)) e.expiry = 'Fecha inválida o vencida.';
      if (!/^\d{3,4}$/.test(c.cvv)) e.cvv = 'CVV inválido.';
    }
    return e;
  };

  const goTo = (validator, next) => {
    const e = validator();
    setErrors(e);
    if (Object.keys(e).length === 0) setStep(next);
  };

  const handleConfirm = async () => {
    const paymentErrors = validatePayment();
    if (!terms) paymentErrors.terms = 'Debes aceptar los términos y la política de privacidad.';
    setErrors(paymentErrors);
    setFormError('');
    if (Object.keys(paymentErrors).length) return;

    setSubmitting(true);
    // Simula el procesamiento (en producción aquí se llamaría al backend / pasarela de pago).
    await new Promise((resolve) => setTimeout(resolve, 900));

    let ownerId = user?.id ?? null;
    if (!user && createAccount) {
      const [first, ...rest] = contact.name.trim().split(/\s+/);
      const res = await register({
        name: first,
        lastName: rest.join(' '),
        email: contact.email,
        phone: contact.phone,
        password,
      });
      if (!res.ok) {
        setSubmitting(false);
        setStep(1);
        setErrors({ [res.field ?? 'email']: res.error });
        return;
      }
      ownerId = res.user.id;
    }

    const detail =
      payment.method === 'tarjeta'
        ? { brand: cardBrand(payment.card.number), last4: payment.card.number.replace(/\D/g, '').slice(-4) }
        : payment.method === 'tienda'
          ? null
          : { operation: payment.operation };

    const result = createOrder({
      lines: priced,
      contact: { ...contact, name: contact.name.trim(), email: contact.email.trim().toLowerCase() },
      delivery: { type: delivery.type, address: finalAddress },
      payment: { method: payment.method, detail },
      userId: ownerId,
    });

    if (!result.ok) {
      setSubmitting(false);
      setFormError(result.error);
      return;
    }

    if (user && delivery.type === 'domicilio' && !selectedSaved && delivery.save) {
      saveAddress({ label: 'Casa', ...finalAddress });
    }

    completed.current = true;
    clear();
    navigate(`/pedido/${result.order.code}`, { replace: true });
  };

  const stepState = (n) => (step === n ? 'active' : step > n ? 'done' : 'todo');
  const confirmLabel =
    payment.method === 'tarjeta'
      ? `Pagar ${formatPrice(totals.total)}`
      : payment.method === 'tienda' && delivery.type === 'tienda'
        ? 'Confirmar reserva'
        : 'Confirmar pedido';

  return (
    <div className="page-container pb-24 pt-14">
      <Link to="/carrito" className="text-[12px] font-semibold text-sara-stone hover:text-sara-ink">
        ← Volver al carrito
      </Link>
      <h1 className="mt-6 text-6xl tracking-[-0.03em]">Finalizar compra</h1>

      <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_400px] xl:gap-20">
        <div>
          <StepSection
            number={1}
            title="Tus datos"
            state={stepState(1)}
            onEdit={() => setStep(1)}
            summary={`${contact.name} · ${contact.email} · ${contact.phone}`}
          >
            <ContactStep
              contact={contact}
              setContact={setContact}
              errors={errors}
              isAuthenticated={isAuthenticated}
              createAccount={createAccount}
              setCreateAccount={setCreateAccount}
              password={password}
              setPassword={setPassword}
              onContinue={() => goTo(validateContact, 2)}
            />
          </StepSection>

          <StepSection
            number={2}
            title="Entrega"
            state={stepState(2)}
            onEdit={() => setStep(2)}
            summary={
              delivery.type === 'tienda'
                ? 'Retiro en tienda'
                : `Envío a domicilio · ${finalAddress.street}, ${finalAddress.district}`
            }
          >
            <DeliveryStep
              delivery={delivery}
              setDelivery={setDelivery}
              errors={errors}
              savedAddresses={savedAddresses}
              isAuthenticated={isAuthenticated}
              onContinue={() => goTo(validateDelivery, 3)}
            />
          </StepSection>

          <StepSection number={3} title="Pago" state={stepState(3)}>
            <PaymentStep
              payment={payment}
              setPayment={setPayment}
              errors={errors}
              deliveryType={delivery.type}
              total={totals.total}
            />

            <div className="mt-8">
              <label className="flex cursor-pointer items-start gap-3 text-[12px] leading-5 text-sara-stone">
                <input
                  type="checkbox"
                  checked={terms}
                  onChange={(e) => setTerms(e.target.checked)}
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
              <p role="alert" className="mt-5 border border-red-200 bg-red-50 px-4 py-3 text-[12px] text-red-700">
                {formError}
              </p>
            )}

            <button type="button" onClick={handleConfirm} disabled={submitting} className="btn-primary mt-8 w-full sm:w-auto sm:min-w-[280px]">
              {submitting ? 'Procesando…' : confirmLabel}
            </button>
          </StepSection>
        </div>

        {/* Resumen */}
        <aside className="h-fit bg-sara-mist px-7 py-8 lg:sticky lg:top-28" aria-label="Resumen del pedido">
          <h2 className="text-3xl">Tu pedido</h2>
          <ul className="mt-6 divide-y divide-sara-ink/10">
            {priced.map((l) => (
              <li key={l.key} className="flex gap-4 py-4 first:pt-0">
                <div className="relative h-20 w-16 shrink-0 bg-sara-sand">
                  <img src={l.product.images[0]} alt="" />
                  <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-sara-ink px-1 text-[10px] font-semibold text-white">
                    {l.qty}
                  </span>
                </div>
                <div className="flex-1 text-[12px]">
                  <p className="text-lg leading-tight">{l.product.name}</p>
                  <p className="mt-1 text-sara-stone">
                    Talla {l.size} · {COLORS.find((c) => c.id === l.color)?.label ?? l.color}
                  </p>
                </div>
                <p className="text-[13px]">{formatPrice(l.total)}</p>
              </li>
            ))}
          </ul>
          <div className="mt-6 border-t border-sara-ink/15 pt-6">
            <OrderTotals totals={totals} />
          </div>
        </aside>
      </div>
    </div>
  );
}