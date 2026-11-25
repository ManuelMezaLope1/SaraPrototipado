import { Link } from "react-router";
import { collectionLink } from "./CollectionVariable";
import { ArrowRight } from "lucide-react";

interface Collection{
    collection: any;
    reverse: any;
}

export default function ColeccionRow({ collection, reverse = false }: Collection) {
    return (
        <>
            <article className="grid items-center gap-8 md:grid-cols-2 md:gap-16 lg:gap-24">
                <div className={reverse ? 'md:order-2' : ''}>
                    <div className="aspect-[666/625] overflow-hidden bg-sara-sand">
                        <img
                            src={collection.image}
                            alt={collection.title}
                            className={`h-full w-full object-cover ${collection.grayscale ? 'grayscale' : ''}`}
                        />
                    </div>
                </div>

                <div className={reverse ? 'md:order-1' : ''}>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-sara-stone">
                        Colección {collection.number}
                    </p>
                    <h2 className="mt-5 text-4xl tracking-[-0.02em]">{collection.title}</h2>
                    <p className="mt-5 max-w-md text-[15px] leading-7 text-sara-stone">{collection.text}</p>
                    <Link
                        to={collectionLink(collection.id)}
                        className="mt-8 inline-flex items-center gap-3 border-b border-sara-ink pb-2 text-[12px] font-semibold transition-colors hover:text-sara-brown"
                    >
                        {collection.cta}
                        <ArrowRight size={16} strokeWidth={1.8} />
                    </Link>
                </div>
            </article>
        </>
    )
}