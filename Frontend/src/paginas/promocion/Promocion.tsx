import FooterPromocion from "./partes/FooterPromocion";
import HeaderPromocion from "./partes/HeaderPromocion";
import PromoSeccion from "./partes/PromoSeccion";

export default function Promocion(){
    return (
        <>
        <div className="pb-24">
            <HeaderPromocion></HeaderPromocion>
            <PromoSeccion></PromoSeccion><br />
            <FooterPromocion></FooterPromocion>
        </div>
        </>
    )
}