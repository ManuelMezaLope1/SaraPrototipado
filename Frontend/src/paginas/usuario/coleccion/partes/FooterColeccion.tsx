import { Link } from "react-router";
import { COLLECTIONS_CTA } from "../variable/CollectionVariable";
import { ArrowRight } from "lucide-react";

export default function FooterColeccion() {
    return (
        <>
            <section className="mt-24 border-t border-sara-line pt-20 text-center md:mt-32">
                <span className="eyebrow">{COLLECTIONS_CTA.eyebrow}</span>
                <h2 className="mx-auto mt-6 max-w-[820px] text-4xl tracking-[-0.02em] md:text-5xl">
                    {COLLECTIONS_CTA.title}
                </h2>
                <Link to={COLLECTIONS_CTA.button.to} className="btn-primary mt-10">
                    {COLLECTIONS_CTA.button.label}
                    <ArrowRight size={18} strokeWidth={1.8} />
                </Link>
            </section>
        </>
    )
}