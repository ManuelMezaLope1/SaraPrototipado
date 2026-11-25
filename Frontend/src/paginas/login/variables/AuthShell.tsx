import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';

const PERKS = [
  'Sigue el estado de tus pedidos y reservas',
  'Guarda tus favoritos y direcciones',
  'Compra más rápido en cada visita',
];

// Estructura común de Ingresar / Registro / Recuperar contraseña.
export default function AuthShell({ eyebrow, title, subtitle, children, footer }) {
  return (
    <div className="mx-auto grid w-full max-w-[1900px] lg:min-h-[640px] lg:grid-cols-[5fr_6fr]">
      <aside className="hidden flex-col justify-between bg-sara-cream px-14 py-16 lg:flex xl:px-24">
        <div>
          <span className="eyebrow">Mi cuenta</span>
          <p className="mt-8 font-display text-6xl leading-[1.02] tracking-[-0.03em]">
            Estilo que
            <br />
            te acompaña
          </p>
          <ul className="mt-12 space-y-4">
            {PERKS.map((perk) => (
              <li key={perk} className="flex items-center gap-3 text-[14px] text-sara-stone">
                <Check size={18} strokeWidth={1.6} className="shrink-0 text-sara-ink" />
                {perk}
              </li>
            ))}
          </ul>
        </div>
        <p className="text-[12px] text-sara-stone">
          ¿Prefieres no registrarte? Puedes{' '}
          <Link to="/catalogo" className="border-b border-sara-ink pb-0.5 font-semibold text-sara-ink">
            comprar como invitado
          </Link>
          .
        </p>
      </aside>

      <section className="flex items-center justify-center px-6 py-14 md:px-10 lg:py-20">
        <div className="w-full max-w-[460px]">
          <span className="eyebrow">{eyebrow}</span>
          <h1 className="mt-6 text-5xl tracking-[-0.03em]">{title}</h1>
          {subtitle && <p className="mt-4 text-[14px] leading-7 text-sara-stone">{subtitle}</p>}
          <div className="mt-10">{children}</div>
          {footer && <div className="mt-8 border-t border-sara-line pt-6 text-[13px] text-sara-stone">{footer}</div>}
        </div>
      </section>
    </div>
  );
}