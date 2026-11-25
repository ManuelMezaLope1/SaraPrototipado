import { MapPin } from "lucide-react";
import { MAP_ADDRESS, mapEmbedUrl, mapOpenUrl, STORE_HOURS } from "../variables/NosVariable";

const STREETS = {
  backgroundColor: '#dfddd7',
  backgroundImage:
    'repeating-linear-gradient(45deg, rgba(0,0,0,0.06) 0 1px, transparent 1px 72px), repeating-linear-gradient(-45deg, rgba(0,0,0,0.06) 0 1px, transparent 1px 72px)',
};

export default function MapaNosotros() {
    const h = STORE_HOURS;
    
    return (
        <>
            <div className="page-container xl:px-[236px]">
                <div className="mt-20 md:mt-28">
                    <section className="grid lg:grid-cols-[2fr_3fr]" aria-label="Horarios y ubicación">
                        <div className="bg-sara-dark px-8 py-12 text-white md:px-12 lg:py-16">
                            <span className="eyebrow border-white/50 text-white/70">{h.eyebrow}</span>
                            <h2 className="mt-6 text-4xl tracking-[-0.01em]">{h.title}</h2>

                            <dl className="mt-10 divide-y divide-white/15 border-y border-white/15">
                                {h.rows.map((r) => (
                                    <div key={r.day} className="flex items-center justify-between gap-6 py-4 text-[12px]">
                                        <dt className="font-semibold">{r.day}</dt>
                                        <dd className="text-white/60">{r.time}</dd>
                                    </div>
                                ))}
                            </dl>
                        </div>

                        {/* Mapa: Google Maps con la dirección de la tienda */}
                        <div className="relative h-[380px] overflow-hidden lg:h-auto lg:min-h-[513px]" style={STREETS}>
                            <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
                                <span className="flex h-[78px] w-[78px] items-center justify-center rounded-full bg-black text-white shadow-xl">
                                    <MapPin size={28} strokeWidth={1.5} />
                                </span>
                            </div>
                            <p
                                className="absolute inset-x-0 bottom-8 text-center text-[10px] uppercase tracking-[0.18em] text-sara-brown"
                                aria-hidden="true"
                            >
                                {h.mapLabel}
                            </p>

                            <iframe
                                title={`Mapa de ubicación: ${MAP_ADDRESS}`}
                                src={mapEmbedUrl}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                allowFullScreen
                                className="absolute inset-0 h-full w-full border-0 [filter:grayscale(0.55)_contrast(0.95)]"
                            />

                            <a
                                href={mapOpenUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="absolute bottom-4 left-4 bg-white px-3 py-2 text-[11px] font-semibold shadow-md hover:bg-sara-cream"
                            >
                                Abrir en Google Maps
                            </a>
                        </div>
                    </section>
                </div>
            </div>
        </>
    )
}