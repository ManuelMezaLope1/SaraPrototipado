import { formatPrice } from "../../catalogo/variable/ProductVariable";



export default function OrderTotals({ totals, shippingNote }) {
  return (
    <dl className="space-y-3 text-[13px]">
      <div className="flex justify-between">
        <dt className="text-sara-stone">Subtotal</dt>
        <dd>{formatPrice(totals.original)}</dd>
      </div>
      {totals.savings > 0 && (
        <div className="flex justify-between">
          <dt className="text-sara-stone">Promociones</dt>
          <dd>− {formatPrice(totals.savings)}</dd>
        </div>
      )}
      <div className="flex justify-between">
        <dt className="text-sara-stone">Envío</dt>
        <dd>{shippingNote ?? (totals.shipping === 0 ? 'Gratis' : formatPrice(totals.shipping))}</dd>
      </div>
      <div className="flex items-baseline justify-between border-t border-sara-ink/15 pt-4">
        <dt className="font-semibold">Total</dt>
        <dd className="text-2xl">{formatPrice(totals.total)}</dd>
      </div>
    </dl>
  );
}