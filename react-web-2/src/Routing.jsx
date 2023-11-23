import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import Navbar from './components/Navbar';
import Instructions from './pages/instrucciones';
import Ingreso from './pages/ingreso';
import Perfil from './pages/perfil';
import Images from './pages/crear-rutina';
import Planner from './pages/planner';
import Notificaciones from './pages/notificaciones';
import Ejercicios from './pages/agregarEjercicios';


function Routing(){
    return (
        <BrowserRouter>
        <Navbar />
            <Routes>
                <Route path={"/"} element={<App />}/>
                <Route path={"/instrucciones"} element={<Instructions/>}/>
                <Route path={"/ingreso"} element={<Ingreso/>}/>
                <Route path={"/mi-perfil"} element={<Perfil/>}/>
                <Route path={"/planner"} element={<Planner/>}/>
                <Route path={"/crear-rutina"} element={<Images/>}/>
                <Route path={"/notificaciones"} element={<Notificaciones/>}/>
                <Route path={"/admin"} element={<Ejercicios/>}/>  
            </Routes>
        </BrowserRouter>
    )
}

export default Routing; 