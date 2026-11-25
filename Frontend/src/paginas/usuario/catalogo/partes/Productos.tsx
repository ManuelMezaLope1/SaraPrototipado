import ProductCard from "../variable/ProductCard";

interface ProductosProps {
    items: any[],
    className?: string,
    isAdmin?: any;
}

export default function Productos({ items, className = '', isAdmin = false }: ProductosProps) {
    return (
        <>
            <section aria-label="Productos">
                <div className={`grid gap-x-6 gap-y-10 sm:grid-cols-2 xl:grid-cols-3 ${className}`}>
                    {items.map((product) => (
                        <ProductCard key={product.id} product={product} isAdmin={isAdmin}/>
                    ))}
                </div>
            </section>
        </>
    )
}