import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function LogoFooter({
  className = '',
  imgClassName = 'h-[55px] w-auto',
  link = true,
}) {
  const [missing, setMissing] = useState(false);

  const content = missing ? (
    <span
      className="flex flex-col items-center leading-none text-[#4a4038]"
      aria-label="SARA Logo"
    >
      <span className="font-display text-4xl">SA</span>
      <span className="mt-1 text-[10px] tracking-[0.5em]">
        SARA
      </span>
    </span>
  ) : (
    <img
      src="/logo-footer.png"
      alt="SARA — Estilo que te acompaña"
      className={imgClassName}
      onError={() => setMissing(true)}
    />
  );

  if (!link) {
    return <div className={className}>{content}</div>;
  }

  return (
    <Link
      to="/"
      className={`inline-flex items-center ${className}`}
      aria-label="Ir al inicio"
    >
      {content}
    </Link>
  );
}