
import { X } from 'lucide-react';
import { useEffect, type ReactNode } from 'react';

interface ModalProps {
    abierto: boolean;
    onCerrar: () => void;
    titulo: string;
    children: ReactNode;
    maxWidth?: string;
}

export default function Modal({
    abierto,
    onCerrar,
    titulo,
    children,
    maxWidth = 'max-w-lg',
}: ModalProps) {

    useEffect(() => {
        if (!abierto) return;

        const manejarTecla = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onCerrar();
        };

        document.addEventListener('keydown', manejarTecla);
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', manejarTecla);
            document.body.style.overflow = '';
        };
    }, [abierto, onCerrar]);

    if (!abierto) return null;

    return (
        <div
            className="fixed inset-0 z-[1000] flex items-center justify-center bg-slate-900/55 p-4 backdrop-blur-sm animate-[fadeIn_.2s_ease]"
            onClick={onCerrar}
        >
            <div
                className={`w-full ${maxWidth} overflow-hidden rounded-2xl bg-white shadow-2xl animate-[slideIn_.25s_ease]`}
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-label={titulo}
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">

                    <h3 className="text-lg font-extrabold text-slate-900">
                        {titulo}
                    </h3>

                    <button
                        type="button"
                        onClick={onCerrar}
                        aria-label="Cerrar modal"
                        className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-500 transition hover:bg-slate-200 hover:text-slate-900"
                    >
                        <X size={20} />
                    </button>

                </div>

                {/* Contenido */}
                <div className="p-5 text-slate-700">
                    {children}
                </div>

            </div>
        </div>
    );
}