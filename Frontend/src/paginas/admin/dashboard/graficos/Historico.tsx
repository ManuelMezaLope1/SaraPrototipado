import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';

import { Line } from 'react-chartjs-2';
import type { ChartOptions, ChartData } from 'chart.js';

import type { CSSProperties } from 'react';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const estilos: Record<string, CSSProperties> = {
    card: {
        background: '#ffffff',
        border: '1px solid rgba(15, 23, 42, 0.08)',
        borderRadius: '14px',
        padding: '20px',
        boxShadow: '0 4px 16px rgba(15, 23, 42, 0.06)',
        width: '100%',
        boxSizing: 'border-box',
    },

    titulo: {
        fontFamily: "'Manrope', sans-serif",
        fontSize: '16px',
        fontWeight: 800,
        color: '#0f172a',
        margin: '0 0 20px',
    },

    grafico: {
        height: '280px',
        position: 'relative',
    },
};

const datos: ChartData<'line'> = {
    labels: [
        'Enero',
        'Febrero',
        'Marzo',
        'Abril',
        'Mayo',
        'Junio',
    ],

    datasets: [
        {
            label: 'Pedidos registrados',
            data: [20, 35, 28, 50, 42, 65],

            borderColor: '#5b8cff',
            backgroundColor: 'rgba(91, 140, 255, 0.12)',

            borderWidth: 3,
            tension: 0.4,

            pointRadius: 4,
            pointHoverRadius: 7,
            pointBackgroundColor: '#5b8cff',
            pointBorderColor: '#ffffff',
            pointBorderWidth: 2,

            fill: true,
        },
    ],
};

const opciones: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
        legend: {
            display: false,
        },

        tooltip: {
            enabled: true,
            backgroundColor: '#0f172a',
            padding: 12,
            cornerRadius: 8,
        },
    },

    scales: {
        y: {
            beginAtZero: true,

            grid: {
                color: '#f1f5f9',
            },

            ticks: {
                precision: 0,
            },
        },

        x: {
            grid: {
                display: false,
            },
        },
    },
};

export default function GraficoLineal() {
    return (
        <div style={estilos.card}>
            <h3 style={estilos.titulo}>
                Evolución de Pedidos
            </h3>

            <div style={estilos.grafico}>
                <Line
                    data={datos}
                    options={opciones}
                />
            </div>
        </div>
    );
}