import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone } from 'lucide-react';
import LogoFooter from './partes/LogoFooter';
import { FOOTER_LEGAL_LINKS, STORE_INFO } from '../../../data/site';


const colTitle = 'mb-6 text-[11px] font-semibold uppercase tracking-[0.2em] text-white';

export default function Footer() {
  return (
    <footer className="bg-sara-dark text-[#cfcac2]">
      <div className="page-container pb-8 pt-16 md:pt-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="inline-block">
              <LogoFooter link={false} imgClassName="h-[140px] w-auto" />
            </div>
            <p className="mt-6 text-[13px]">{STORE_INFO.description}</p>
          </div>

          <div>
            <h3 className={`${colTitle} font-sans`}>Encuéntranos</h3>
            <ul className="space-y-2 text-[13px]">
              <li className="flex items-center gap-3">
                <MapPin size={18} strokeWidth={1.5} /> {STORE_INFO.address}
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} strokeWidth={1.5} /> {STORE_INFO.phone}
              </li>
            </ul>
          </div>

          <div>
            <h3 className={`${colTitle} font-sans`}>Atención</h3>
            <ul className="space-y-2 text-[13px]">
              <li className="flex items-center gap-3">
                <Mail size={18} strokeWidth={1.5} /> {STORE_INFO.email}
              </li>
              <li>{STORE_INFO.hours}</li>
            </ul>
          </div>

          <div>
            <h3 className={`${colTitle} font-sans`}>Legal</h3>
            <ul className="space-y-3 text-[13px]">
              {FOOTER_LEGAL_LINKS.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="transition-colors hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-white/15 pt-6 text-[11px] text-[#8f8a83]">
          © {STORE_INFO.year} {STORE_INFO.legalName}. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}