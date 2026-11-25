import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { collectionLink } from "./CollectionVariable";

interface Collection{
    collection: any;
}

export default function CollectionFeature({ collection }: Collection) {
    return (
        <>
            <article className="grid overflow-hidden lg:grid-cols-[5fr_3fr]">
                <div className="h-[420px] bg-sara-sand md:h-[560px] lg:h-auto lg:min-h-[640px] xl:min-h-[760px]">
                    <img
                        src={collection.image}
                        alt={collection.title}
                        className="h-full w-full object-cover"
                    />
                </div>

                <div className="flex flex-col justify-center bg-sara-dark px-8 py-14 text-white md:px-14 lg:px-[68px]">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-white/60">
                        Colección {collection.number}
                    </p>
                    <h2 className="mt-5 text-4xl tracking-[-0.02em]">{collection.title}</h2>
                    <p className="mt-6 max-w-md text-[15px] leading-7 text-white/70">{collection.text}</p>
                    <Link
                        to={collectionLink(collection.id)}
                        className="mt-10 inline-flex items-center justify-between gap-6 self-stretch bg-black px-8 py-5 text-[11px] font-semibold uppercase tracking-[0.16em] transition-colors hover:bg-white hover:text-sara-ink md:self-start md:justify-center"
                    >
                        {collection.cta}
                        <ArrowRight size={18} strokeWidth={1.8} />
                    </Link>
                </div>
            </article>
        </>
    );
}
