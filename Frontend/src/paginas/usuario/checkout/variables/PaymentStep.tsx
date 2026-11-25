import { QrCode } from "lucide-react";
import { PAYMENT_METHODS, paymentLabel, WALLET } from "../../../../data/DatosCuenta";
import RadioCard from "./RadioCard";
import { formatPrice } from "../../catalogo/variable/ProductVariable";
import Field, { inputClass } from "../../../../data/Field";
import { cardBrand, formatCardNumber, formatExpiry } from "../../../../data/Validadores";


const SUBTITLES = {
  tienda: {
    tienda: 'Reservamos tus prendas 48 horas y pagas al retirarlas (efectivo o tarjeta).',
    domicilio: 'Pagas al recibir tu pedido (efectivo o Yape/Plin al repartidor).',
  },
  yape: 'Escanea el QR o yapea al número de la tienda.',
  plin: 'Escanea el QR o haz Plin al número de la tienda.',
  tarjeta: 'Visa, Mastercard o American Express.',
};

// Paso 3: método de pago (todo simulado: no se procesa ni se guarda ninguna tarjeta).
export default function PaymentStep({ payment, setPayment, errors, deliveryType, total }) {
  const setCard = (field, value) => setPayment((p) => ({ ...p, card: { ...p.card, [field]: value } }));

  return (
    <div className="space-y-4">
      {PAYMENT_METHODS.map((m) => (
        <RadioCard
          key={m.id}
          name="payment"
          checked={payment.method === m.id}
          onChange={() => setPayment((p) => ({ ...p, method: m.id }))}
          title={paymentLabel(m.id, deliveryType)}
          subtitle={m.id === 'tienda' ? SUBTITLES.tienda[deliveryType] : SUBTITLES[m.id]}
        >
          {(m.id === 'yape' || m.id === 'plin') && (
            <div className="grid gap-6 sm:grid-cols-[150px_1fr]">
              <div className="flex h-[150px] w-[150px] flex-col items-center justify-center gap-2 border border-dashed border-sara-stone/50 bg-sara-mist text-sara-stone">
                <QrCode size={64} strokeWidth={1.2} />
                <span className="text-[10px] uppercase tracking-[0.14em]">[QR {m.label}]</span>
              </div>
              <div className="space-y-4 text-[12px] leading-6 text-sara-stone">
                <p>
                  Envía <strong className="text-sara-ink">{formatPrice(total)}</strong> al{' '}
                  <strong className="text-sara-ink">{WALLET.number}</strong> ({WALLET.holder}) y escribe aquí el número
                  de operación.
                </p>
                <Field label="N.º de operación" htmlFor="co-op" error={errors.operation}>
                  <input
                    id="co-op"
                    inputMode="numeric"
                    maxLength={12}
                    value={payment.operation}
                    onChange={(e) => setPayment((p) => ({ ...p, operation: e.target.value.replace(/\D/g, '') }))}
                    placeholder="Ej. 01234567"
                    className={inputClass(errors.operation)}
                  />
                </Field>
                <p>Validaremos el pago y confirmaremos tu pedido por correo o WhatsApp.</p>
              </div>
            </div>
          )}

          {m.id === 'tarjeta' && (
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Número de tarjeta" htmlFor="co-card" error={errors.number} className="sm:col-span-2">
                <input
                  id="co-card"
                  inputMode="numeric"
                  autoComplete="cc-number"
                  value={payment.card.number}
                  onChange={(e) => setCard('number', formatCardNumber(e.target.value))}
                  placeholder="0000 0000 0000 0000"
                  className={inputClass(errors.number)}
                />
                {payment.card.number && (
                  <p className="mt-1.5 text-[11px] text-sara-stone">{cardBrand(payment.card.number)}</p>
                )}
              </Field>
              <Field label="Nombre en la tarjeta" htmlFor="co-card-name" error={errors.cardName} className="sm:col-span-2">
                <input
                  id="co-card-name"
                  autoComplete="cc-name"
                  value={payment.card.name}
                  onChange={(e) => setCard('name', e.target.value)}
                  className={inputClass(errors.cardName)}
                />
              </Field>
              <Field label="Vencimiento" htmlFor="co-exp" error={errors.expiry}>
                <input
                  id="co-exp"
                  inputMode="numeric"
                  autoComplete="cc-exp"
                  value={payment.card.expiry}
                  onChange={(e) => setCard('expiry', formatExpiry(e.target.value))}
                  placeholder="MM/AA"
                  className={inputClass(errors.expiry)}
                />
              </Field>
              <Field label="CVV" htmlFor="co-cvv" error={errors.cvv}>
                <input
                  id="co-cvv"
                  inputMode="numeric"
                  autoComplete="cc-csc"
                  maxLength={4}
                  value={payment.card.cvv}
                  onChange={(e) => setCard('cvv', e.target.value.replace(/\D/g, ''))}
                  placeholder="123"
                  className={inputClass(errors.cvv)}
                />
              </Field>
              <p className="text-[11px] leading-5 text-sara-stone sm:col-span-2">
                Demo: no se realiza ningún cobro y el número de tarjeta no se guarda. Prueba con 4111 1111 1111 1111.
              </p>
            </div>
          )}
        </RadioCard>
      ))}
    </div>
  );
}