import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { FEATURED_CATEGORIES } from '../variable/HomeVariable';

export default function FeaturedCategories() {
    return (
        <section className="page-container py-20 md:py-28 xl:px-[236px]">
            <div className="flex items-end justify-between gap-6">
                <div>
                    <span className="eyebrow">Encuentra tu estilo</span>
                    <h2 className="mt-4 text-4xl tracking-[-0.02em] md:text-5xl">Categorías destacadas</h2>
                </div>
                <Link
                    to="/catalogo"
                    className="mb-1 inline-flex items-center gap-3 border-b border-sara-ink pb-2 text-[12px] font-semibold"
                >
                    Ver todo <ArrowRight size={16} strokeWidth={1.8} />
                </Link>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-[3fr_2fr]">
                {FEATURED_CATEGORIES.map((cat) => (
                    <Link
                        key={cat.id}
                        to={cat.to}
                        className="group relative block h-[420px] overflow-hidden bg-sara-sand md:h-[500px]">
                        <img
                            src={cat.image}
                            alt={cat.title}
                            className={`h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 ${cat.grayscale ? 'grayscale' : ''
                                }`}
                        />
                        <div className="absolute inset-x-6 bottom-6 flex items-center justify-between bg-sara-cream/95 px-7 py-7 backdrop-blur-sm md:inset-x-[22px]">
                            <div>
                                <h3 className="text-3xl">{cat.title}</h3>
                                <p className="mt-2 text-[13px] text-sara-stone">{cat.subtitle}</p>
                            </div>
                            <ArrowRight
                                size={20}
                                strokeWidth={1.8}
                                className="transition-transform group-hover:translate-x-1"
                            />
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
