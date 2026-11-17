import FilasColeccion from "./partes/FilasColeccion";
import FooterColeccion from "./partes/FooterColeccion";
import HeaderColeccion from "./partes/HeaderColeccion";

export default function Coleccion(){
    return(
        <>
            <div className="pb-24">
                <HeaderColeccion></HeaderColeccion>
                <FilasColeccion></FilasColeccion>
                <FooterColeccion></FooterColeccion>
            </div>
        </>
    )
}