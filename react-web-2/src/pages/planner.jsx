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
          title: 'Evento 1',
          start: new Date(2023, 8, 15, 10, 0), // Año, mes (0-11), día, hora, minuto
          end: new Date(2023, 8, 15, 12, 0),
        },
        // Otros eventos aquí
      ];
    
    return (

        <div className='main-planner-container'>
                <h1>Planner</h1>
            <div className='planner-container'>
                
                <Calendar
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