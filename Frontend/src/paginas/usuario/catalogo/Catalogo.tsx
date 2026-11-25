import Filtro from "./partes/Filtro";
import HeaderCatalogo from "./partes/HeaderCatalogo";
import Productos from "./partes/Productos";
import { products } from "./variable/ProductVariable";

export default function catalogo() {
    return (
        <>
            <div className="page-container pb-24">
                <HeaderCatalogo></HeaderCatalogo>

                <div className="flex gap-8 m-8">
                    <div className="w-1/4">
                        <Filtro />
                    </div>

                    <div className="flex-1">
                        <Productos items={products} />
                    </div>
                </div>
            </div>
        </>
    )
}