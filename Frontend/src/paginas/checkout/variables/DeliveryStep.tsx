import { SHIPPING } from "../../../data/DatosCuenta";
import Field, { inputClass } from "../../../data/Field";
import { STORE_INFO } from "../../../data/site";
import { formatPrice } from "../../catalogo/variable/ProductVariable";
import { MAP_ADDRESS } from "../../nosotros/variables/NosVariable";
import RadioCard from "./RadioCard";

interface Componentes{
    delivery: any, setDelivery: any, errors: any, savedAddresses: any, isAuthenticated: any, onContinue: any
}

// Paso 2: retiro en tienda o envío a domicilio (simulado).
export default function DeliveryStep({ delivery, setDelivery, errors, savedAddresses, isAuthenticated, onContinue }: Componentes) {
  const set = (field) => (e) => setDelivery((d) => ({ ...d, [field]: e.target.value }));
  const isNew = delivery.addressId === 'new';

  return (
    <div className="space-y-4">
      <RadioCard
        name="delivery"
        checked={delivery.type === 'tienda'}
        onChange={() => setDelivery((d) => ({ ...d, type: 'tienda' }))}
        title="Retiro en tienda"
        subtitle={`${MAP_ADDRESS} · ${STORE_INFO.hours} · ${SHIPPING.pickupEta}`}
        right="Gratis"
      />

      <RadioCard
        name="delivery"
        checked={delivery.type === 'domicilio'}
        onChange={() => setDelivery((d) => ({ ...d, type: 'domicilio' }))}
        title="Envío a domicilio"
        subtitle={`Lima y Callao · ${SHIPPING.homeEta} · Gratis desde ${formatPrice(SHIPPING.freeFrom)} (simulado)`}
        right={formatPrice(SHIPPING.homeBase)}
      >
        <div className="space-y-4">
          {savedAddresses.length > 0 && (
            <div className="space-y-2">
              {savedAddresses.map((a) => (
                <label key={a.id} className="flex cursor-pointer items-start gap-3 border border-sara-line px-4 py-3 text-[12px]">
                  <input
                    type="radio"
                    name="saved-address"
                    checked={delivery.addressId === a.id}
                    onChange={() => setDelivery((d) => ({ ...d, addressId: a.id }))}
                    className="mt-0.5 accent-black"
                  />
                  <span>
                    <span className="font-semibold">{a.label || 'Dirección'}</span>
                    {a.isDefault && <span className="ml-2 text-sara-stone">· Principal</span>}
                    <span className="block text-sara-stone">
                      {a.street}, {a.district}
                    </span>
                  </span>
                </label>
              ))}
              <label className="flex cursor-pointer items-center gap-3 border border-sara-line px-4 py-3 text-[12px]">
                <input
                  type="radio"
                  name="saved-address"
                  checked={isNew}
                  onChange={() => setDelivery((d) => ({ ...d, addressId: 'new' }))}
                  className="accent-black"
                />
                <span className="font-semibold">Usar otra dirección</span>
              </label>
            </div>
          )}

          {isNew && (
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Dirección" htmlFor="co-street" error={errors.street} className="sm:col-span-2">
                <input
                  id="co-street"
                  autoComplete="street-address"
                  value={delivery.street}
                  onChange={set('street')}
                  placeholder="Av. / Calle y número, dpto."
                  className={inputClass(errors.street)}
                />
              </Field>
              <Field label="Distrito" htmlFor="co-district" error={errors.district}>
                <select
                  id="co-district"
                  value={delivery.district}
                  onChange={set('district')}
                  className={inputClass(errors.district)}
                >
                  <option value="">Selecciona…</option>
                  {DISTRICTS.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Referencia (opcional)" htmlFor="co-ref">
                <input
                  id="co-ref"
                  value={delivery.reference}
                  onChange={set('reference')}
                  placeholder="Frente al parque, portón negro…"
                  className={inputClass(false)}
                />
              </Field>
              {isAuthenticated && (
                <label className="flex cursor-pointer items-center gap-3 text-[12px] sm:col-span-2">
                  <input
                    type="checkbox"
                    checked={delivery.save}
                    onChange={(e) => setDelivery((d) => ({ ...d, save: e.target.checked }))}
                    className="h-4 w-4 accent-black"
                  />
                  Guardar esta dirección en mi cuenta
                </label>
              )}
            </div>
          )}
        </div>
      </RadioCard>

      <button type="button" onClick={onContinue} className="btn-primary mt-2">
        Continuar a pago
      </button>
    </div>
  );
}