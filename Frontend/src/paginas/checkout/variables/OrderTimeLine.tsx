import { Check } from 'lucide-react';
import { STATUS_FLOW, statusLabel } from '../../../data/DatosCuenta';
import { formatDateTime } from '../../../data/Format';

// Línea de tiempo del pedido. Si fue cancelado, muestra solo hasta la cancelación.
export default function OrderTimeLine({ order }) {
  const deliveryType = order.delivery.type;
  const at = (status) => order.history.find((h) => h.status === status)?.at;

  if (order.status === 'cancelado') {
    return (
      <ol className="space-y-5">
        {order.history.map((h) => (
          <li key={h.status} className="flex items-center gap-4 text-[13px]">
            <span
              className={`flex h-7 w-7 items-center justify-center rounded-full ${
                h.status === 'cancelado' ? 'bg-red-700 text-white' : 'bg-sara-ink text-white'
              }`}
            >
              <Check size={14} strokeWidth={2} />
            </span>
            <span className="font-semibold">{statusLabel(h.status, deliveryType)}</span>
            <span className="text-[11px] text-sara-stone">{formatDateTime(h.at)}</span>
          </li>
        ))}
      </ol>
    );
  }

  const current = STATUS_FLOW.indexOf(order.status);

  return (
    <ol className="space-y-5">
      {STATUS_FLOW.map((status, i) => {
        const done = i <= current;
        return (
          <li key={status} className="flex items-center gap-4 text-[13px]">
            <span
              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border ${
                done ? 'border-sara-ink bg-sara-ink text-white' : 'border-sara-line text-transparent'
              }`}
            >
              <Check size={14} strokeWidth={2} />
            </span>
            <span className={done ? 'font-semibold' : 'text-sara-stone'}>{statusLabel(status, deliveryType)}</span>
            {at(status) && <span className="text-[11px] text-sara-stone">{formatDateTime(at(status))}</span>}
          </li>
        );
      })}
    </ol>
  );
}