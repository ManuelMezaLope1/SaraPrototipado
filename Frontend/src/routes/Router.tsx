import { createBrowserRouter } from "react-router";
import App from "../App";
import Inicio from "../paginas/usuario/inicio/Inicio";
import Catalogo from "../paginas/usuario/catalogo/Catalogo";
import Coleccion from "../paginas/usuario/coleccion/Coleccion";
import Promocion from "../paginas/usuario/promocion/Promocion";
import Nosotros from "../paginas/usuario/nosotros/Nosotros";
import Favoritos from "../paginas/usuario/favorito/Favoritos";
import Carro from "../paginas/usuario/Carro/Carro";
import DetallesProducto from "../paginas/usuario/detallesProducto/DetallesProducto";
import Checkout from "../paginas/usuario/checkout/Checkout";
import Login from "../paginas/usuario/login/Login";
import Registro from "../paginas/usuario/login/Registro";
import Cuenta from "../paginas/usuario/cuenta/Cuenta";
import NotFound from "../componentes/notfound/NotFound";
import ConfirmacionOrden from "../paginas/usuario/checkout/ConfirmacionOrden";
import DetallesPedidos from "../paginas/usuario/cuenta/DetallesPedidos";
import Dashboard from "../paginas/admin/dashboard/dashboard";

const routes=createBrowserRouter([
    {path: '', Component: App, children: [
        /*
        ============================================================
        =                       Para Usuarios                      =
        ============================================================
        */
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
        { path: '*', Component: NotFound },

        /*
        ============================================================
        =                       Para Usuarios                      =
        ============================================================
        */
       { path: 'dashboard', Component: Dashboard },
    ]}
])

export default routes;