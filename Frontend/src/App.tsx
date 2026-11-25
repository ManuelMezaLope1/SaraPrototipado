import './App.css'
import Header from '../src/componentes/layout/header/Header';
import { Outlet } from 'react-router'
import Footer from './componentes/layout/footer/Footer';

function App() {
  return (
    <>
      <Header></Header>
      <main>
        <Outlet></Outlet>
      </main>
      <Footer></Footer>
    </>
  )
}

export default App
