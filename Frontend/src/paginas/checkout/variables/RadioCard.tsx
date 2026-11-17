interface Componentes{
    name: any, checked: any, onChange: any, title: any, subtitle: any, right: any, children: any
}

export default function RadioCard({ name, checked, onChange, title, subtitle, right, children }: Componentes) {
  return (
    <div className={`border transition-colors ${checked ? 'border-sara-ink' : 'border-sara-line hover:border-sara-ink/50'}`}>
      <label className="flex cursor-pointer items-start gap-4 px-5 py-4">
        <input
          type="radio"
          name={name}
          checked={checked}
          onChange={onChange}
          className="mt-1 h-4 w-4 shrink-0 accent-black"
        />
        <span className="flex-1">
          <span className="block text-[13px] font-semibold">{title}</span>
          {subtitle && <span className="mt-1 block text-[12px] leading-5 text-sara-stone">{subtitle}</span>}
        </span>
        {right && <span className="text-[13px] font-semibold">{right}</span>}
      </label>
      {checked && children && <div className="border-t border-sara-line px-5 py-5">{children}</div>}
    </div>
  );
}