import React, { useState, useCallback } from 'react';
import moment from 'moment';
import 'moment/locale/es';
import './planner.css';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

function Planner() {

    const localizer = momentLocalizer(moment);

    const eventos = [
        {
          title: 'Rutina push',
          start: new Date(2023, 8, 11, 10, 0), // Año, mes (0-11), día, hora, minuto
          end: new Date(2023, 8, 11, 12, 0),
        },
        {
            title: 'Rutina pull',
            start: new Date(2023, 8, 13, 10, 0), // Año, mes (0-11), día, hora, minuto
            end: new Date(2023, 8, 13, 12, 0),
        },
        {
            title: 'Rutina legs',
            start: new Date(2023, 8, 15, 10, 0), // Año, mes (0-11), día, hora, minuto
            end: new Date(2023, 8, 15, 12, 0),
        },
      ];
    
    return (

        <div className='main-planner-container' id='planner-div-mpc'>
                <h1>Planner</h1>
            <div className='planner-container' id='planner-div-pc'>
                
                <Calendar id='planner-calendar'
                    localizer={localizer}
                    events={eventos}
                    startAccessor="start"
                    endAccessor="end"
                />
            
            </div>

        </div>

    );  
}

export default Planner;