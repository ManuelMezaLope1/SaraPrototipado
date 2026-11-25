// Encabezado común de cada sección del panel del cliente.
export default function TituloPanel({ eyebrow, title, children }) {
  return (
    <header className="flex flex-wrap items-end justify-between gap-4 border-b border-sara-line pb-8">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h2 className="mt-5 text-4xl tracking-[-0.02em] md:text-5xl">{title}</h2>
      </div>
      {children}
    </header>
  );
}

// Mensaje de confirmación o error de un formulario.
export function FormMessage({ message }) {
  if (!message) return null;
  return (
    <p
      role="status"
      className={`text-[12px] ${message.type === 'ok' ? 'text-green-700' : 'text-red-700'}`}
    >
      {message.text}
    </p>
  );
}