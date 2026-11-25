import { createBrowserRouter } from "react-router";
import App from "../App";
import Inicio from "../paginas/inicio/Inicio";
import Catalogo from "../paginas/catalogo/Catalogo";
import Coleccion from "../paginas/coleccion/Coleccion";
import Promocion from "../paginas/promocion/Promocion";
import Nosotros from "../paginas/nosotros/Nosotros";
import Favoritos from "../paginas/favorito/Favoritos";
import Carro from "../paginas/Carro/Carro";
import DetallesProducto from "../paginas/detallesProducto/DetallesProducto";
import Checkout from "../paginas/checkout/Checkout";
import Login from "../paginas/login/Login";
import Registro from "../paginas/login/Registro";
import Cuenta from "../paginas/cuenta/Cuenta";
import NotFound from "../componentes/notfound/NotFound";
import ConfirmacionOrden from "../paginas/checkout/ConfirmacionOrden";
import DetallesPedidos from "../paginas/cuenta/DetallesPedidos";

const routes=createBrowserRouter([
    {path: '', Component: App, children: [
        {index: true, Component: Inicio},
        { path: 'inicio', Component: Inicio},
        { path: 'catalogo', Component: Catalogo },
        { path: 'colecciones', Component: Coleccion },
        { path: 'promociones', Component: Promocion },
        { path: 'nosotros', Component: Nosotros },
        { path: 'favoritos', Component: Favoritos },
        { path: 'carrito', Component: Carro },
        { path: `catalogo/producto/:id`, Component: DetallesProducto },
        { path: 'checkout', Component: Checkout },
        { path: 'login', Component: Login },
        { path: 'registro', Component: Registro },

        { path: 'cuenta', Component: Cuenta },
        { path: 'pedido/:code', Component: ConfirmacionOrden },
        { path: 'cuenta/pedidos/:code', Component: DetallesPedidos },
        { path: '*', Component: NotFound }
    ]}
])

export default routes;