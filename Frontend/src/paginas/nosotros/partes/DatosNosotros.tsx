import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { mapDirectionsUrl, STORE_LOCATION } from "../variables/NosVariable";

const ICONS = { ubicacion: MapPin, telefono: Phone, correo: Mail };

export default function DatosNosotros() {
    const s = STORE_LOCATION;

    return (
        <>
            <div className="page-container">
                <div className="mt-16 md:mt-20">
                    <article className="grid lg:grid-cols-[5fr_3fr]">
                        <div className="h-[380px] bg-sara-sand md:h-[520px] lg:h-auto lg:min-h-[600px] xl:min-h-[640px]">
                            <img
                                src={s.image}
                                alt={`Interior de la tienda ${s.name}`}
                                className="h-full w-full object-cover"
                            />
                        </div>

                        <div className="flex flex-col justify-center bg-sara-mist px-8 py-12 md:px-14 lg:px-[68px]">
                            <span className="eyebrow self-start">{s.eyebrow}</span>
                            <h2 className="mt-8 text-4xl tracking-[-0.02em]">{s.name}</h2>

                            <p className="mt-8 text-[14px] leading-7 text-sara-stone">
                                {s.addressLines.map((line) => (
                                    <span key={line} className="block">
                                        {line}
                                    </span>
                                ))}
                            </p>

                            <ul className="mt-10 divide-y divide-sara-ink/15 border-y border-sara-ink/15">
                                {s.details.map((d) => {
                                    const Icon = ICONS[d.id];
                                    return (
                                        <li key={d.id} className="flex items-center gap-5 py-5">
                                            <Icon size={20} strokeWidth={1.5} className="shrink-0" aria-hidden="true" />
                                            <div>
                                                <p className="text-[11px] font-semibold">{d.label}</p>
                                                <p className="mt-1 text-[11px] text-sara-stone">{d.value}</p>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>

                            <a
                                href={mapDirectionsUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-primary mt-10 self-start"
                            >
                                {s.cta}
                                <ArrowRight size={18} strokeWidth={1.8} />
                            </a>
                        </div>
                    </article>
                </div>
            </div>
        </>
    )
}