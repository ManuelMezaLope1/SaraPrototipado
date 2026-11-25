import { Book } from "lucide-react";
import type { CSSProperties } from "react";
import GraficoHistorico from "../graficos/Historico";
import UltimosMovimientos from "./PaginaDashboard/UltimosMovimientos";

const estilos: Record<string, CSSProperties> = {
    kpiGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
        gap: '14px',
        marginBottom: '20px',
    },

    kpiCard: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '8px',
        padding: '16px',
        position: 'relative',
        background: '#ffffff',
        border: '1px solid rgba(15, 23, 42, 0.08)',
        borderRadius: '14px',
        boxShadow: '0 4px 16px rgba(15, 23, 42, 0.06)',
        transition: 'transform .22s ease, box-shadow .22s ease, border-color .22s ease',
        color: '#0f172a',
    },

    kpiCardH3: {
        fontFamily: "'Manrope', 'sans-serif'",
        fontSize: '1.4rem',
        fontWeight: '800',
        margin: '0',
        lineHeight: '1.1',
        color: 'var(--text-primary)',
    },

    kpiIcon: {
        flexShrink: '0',
        width: '42px',
        height: '42px',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'color-mix(in srgb, #5b8cff 14%, transparent)',
        color: '#5b8cff',
    },

    kpiBody: {
        display: 'flex',
        flexDirection: 'column',
        minWidth: '0',
    },

    kpiLabel: {
        color: '#64748b',
        fontSize: '.73rem',
        fontWeight: '600',
        textTransform: 'capitalize',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    }
};

const indicadores = [
    { id: 1, valor: 2, label: 'productos' },
    { id: 2, valor: 1, label: 'categorias' },
    { id: 3, valor: 1, label: 'promociones' },
];

export default function ResumenDashboard() {
    return (
        <>
            <div style={estilos.kpiGrid}>
                {indicadores.map((item) => (
                    <div key={item.id} style={estilos.kpiCard}>
                        <span style={estilos.kpiIcon}>
                            <Book size={24} strokeWidth={1.5} />
                        </span>

                        <div style={estilos.kpiBody}>
                            <h3 style={estilos.kpiCardH3}>
                                {item.valor}
                            </h3>

                            <span style={estilos.kpiLabel}>
                                {item.label}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <GraficoHistorico></GraficoHistorico>
            <br />
            <UltimosMovimientos ultimasEntradas={[]} ultimasSalidas={[]}></UltimosMovimientos>
        </>
    )
}