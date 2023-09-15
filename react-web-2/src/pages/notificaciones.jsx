
import React from "react";
import Switcher from "../components/Switcher";
import './notificaciones.css';
import { Link } from 'react-router-dom';


function Notificaciones(){

    return (

       <div className="Notificaciones">
        <h1>Notificaciones</h1>

       <div className="Dias">
        <Switcher text="Lunes    " />   
        <Switcher text="Martes   " />
        <Switcher text="Miercoles" />
        <Switcher text="Jueves   " />
        <Switcher text="Viernes  " />
        <Switcher text="Sabado   " />
        <Switcher text="Domingo  " />
       </div>
       <div className="volver">
         <button>
           <div><Link to= '/mi-perfil' > Volver a perfil </Link></div>
         </button>

       </div>
    </div>

    ); 


}

export default Notificaciones;
