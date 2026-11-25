import { statusLabel } from "../../../data/DatosCuenta";


const STYLES = {
    pendiente: 'bg-sara-sand text-sara-ink',
    confirmado: 'bg-sara-mist text-sara-ink',
    listo: 'bg-sara-ink text-white',
    entregado: 'bg-sara-dark text-white',
    cancelado: 'border border-red-300 bg-white text-red-700',
};

export default function OrderStatusBadge({ status, deliveryType }) {
    return (
        <span
            className={`inline-block px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] ${STYLES[status] ?? STYLES.pendiente
                }`}
        >
            {statusLabel(status, deliveryType)}
        </span>
    );
}