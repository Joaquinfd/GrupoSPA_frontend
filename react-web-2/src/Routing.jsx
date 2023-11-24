import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import Navbar from './components/Navbar';
import Instructions from './pages/instrucciones';
import Ingreso from './pages/ingreso';
import Perfil from './pages/perfil';
import Images from './pages/crear-rutina';
import Planner from './pages/planner';
import Notificaciones from './pages/notificaciones';
import CrearEjercicios from './pages/agregarEjercicios';
import EliminarEjercicios from './pages/eliminarEjercicios';
import ActualizarEjercicios from './pages/actualizarEjercicios';
import ObtenerEjercicios from './pages/obtenerEjercicios';
import Admin from './pages/admin';

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
                <Route path={"/crearEjercicios"} element={<CrearEjercicios/>}/>
                <Route path={"/eliminarEjercicios"} element={<EliminarEjercicios/>}/>
                <Route path={"/actualizarEjercicios"} element={<ActualizarEjercicios/>}/>
                <Route path={"/obtenerEjercicios"} element={<ObtenerEjercicios/>}/>
                <Route path={"/admin"} element={<Admin/>}/>

            </Routes>
        </BrowserRouter>
    )
}

export default Routing; 