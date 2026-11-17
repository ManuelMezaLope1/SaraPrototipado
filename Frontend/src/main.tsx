import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import routes from './routes/Router.tsx'
import { StoreProvider } from './contexto/TiendaContexto.tsx'
import { AuthProvider } from './contexto/AuthContexto.tsx'
import { CartProvider } from './contexto/CarroContexto.tsx'
import { OrdersProvider } from './contexto/OrderContexto.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StoreProvider>
      <AuthProvider>
        <CartProvider>
          <OrdersProvider>
            <RouterProvider router={routes} />
          </OrdersProvider>
        </CartProvider>
      </AuthProvider>
    </StoreProvider>
  </StrictMode>,
)
