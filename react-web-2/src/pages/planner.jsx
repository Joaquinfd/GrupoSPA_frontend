import React, { useState } from 'react';
import Calendar from 'react-calendar';


function Planner() {

    return (
        <div>
            <Calendar/>
            {/* Añadir function para mostrar dia actual 
            Inspeccionar e ir cambiando el css cada clase, cuadros de dias mas grandes, botones de añadir actividad, etc.*/}
        </div>

    );  
}

export default Planner;