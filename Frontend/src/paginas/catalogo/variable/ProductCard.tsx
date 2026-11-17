import { Link } from "react-router";

interface ProductCardProps {
  product: any;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="group relative bg-white transition-shadow duration-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.07)]">
      <Link to={`producto/${product.id}`} className="block">
        <div className="aspect-[4/5] overflow-hidden bg-sara-sand">
          <img
            src={product.images}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-70 saturate-50"
          />
        </div>

        <div className="px-4 pb-6 pt-5">
          <p className="text-[10px] uppercase tracking-[0.16em] text-sara-brown">
            {product.eyebrow}
          </p>

          <div className="mt-3 flex items-baseline justify-between gap-4">
            <h3 className="text-[20px] leading-tight">{product.name}</h3>

            <span className="shrink-0 text-right text-[13px]">
              S/. {product.price}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}