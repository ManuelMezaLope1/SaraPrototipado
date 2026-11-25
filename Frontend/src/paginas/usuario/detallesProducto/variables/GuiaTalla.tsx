import { useEffect } from 'react';
import { X } from 'lucide-react';

const ROWS = [
  { size: 'XS', bust: '80–84', waist: '60–64', hip: '86–90' },
  { size: 'S', bust: '85–89', waist: '65–69', hip: '91–95' },
  { size: 'M', bust: '90–94', waist: '70–74', hip: '96–100' },
  { size: 'L', bust: '95–99', waist: '75–79', hip: '101–105' },
  { size: 'XL', bust: '100–106', waist: '80–86', hip: '106–112' },
];

// Guía de tallas (medidas en cm). Cierra con Escape, clic fuera o el botón X.
export default function SizeGuideModal({ onClose }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
      onClick={onClose}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="guia-tallas-title"
        className="w-full max-w-lg bg-white p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <h2 id="guia-tallas-title" className="text-3xl">
            Guía de tallas
          </h2>
          <button type="button" onClick={onClose} aria-label="Cerrar guía de tallas">
            <X size={20} strokeWidth={1.6} />
          </button>
        </div>
        <p className="mt-3 text-[12px] text-sara-stone">Medidas del cuerpo en centímetros.</p>

        <table className="mt-6 w-full text-left text-[12px]">
          <thead>
            <tr className="border-b border-sara-line text-sara-stone">
              <th className="py-3 font-medium">Talla</th>
              <th className="py-3 font-medium">Busto</th>
              <th className="py-3 font-medium">Cintura</th>
              <th className="py-3 font-medium">Cadera</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r) => (
              <tr key={r.size} className="border-b border-sara-line">
                <td className="py-3 font-semibold">{r.size}</td>
                <td className="py-3">{r.bust}</td>
                <td className="py-3">{r.waist}</td>
                <td className="py-3">{r.hip}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}