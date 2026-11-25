import ColeccionRow from "../variable/ColeccionRow";
import { COLLECTIONS } from "../variable/CollectionVariable";

export default function FilasColeccion() {
    const rest = COLLECTIONS.filter((c) => !c.featured);
    
    return (
        <>
            <div className="page-container xl:px-[236px]">
                <div className="mt-20 space-y-20 md:mt-28 md:space-y-28">
                    {rest.map((c, i) => (
                        <ColeccionRow key={c.id} collection={c} reverse={i % 2 === 1} />
                    ))}
                </div>
            </div>
        </>
    )
}