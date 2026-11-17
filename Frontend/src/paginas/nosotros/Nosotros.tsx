import DatosNosotros from "./partes/DatosNosotros";
import HeaderNosotros from "./partes/HeaderNosotros";
import MapaNosotros from "./partes/MapaNosotros";
import ServiciosNosotros from "./partes/ServiciosNosotros";

export default function Nosotros() {
    return (
        <>
            <div className="pb-24">
                <HeaderNosotros></HeaderNosotros>
                <DatosNosotros></DatosNosotros>
                <MapaNosotros></MapaNosotros>
                <ServiciosNosotros></ServiciosNosotros>
            </div>
        </>
    )
}