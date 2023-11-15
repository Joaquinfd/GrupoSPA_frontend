import React, { useState, useCallback, useEffect } from 'react';
import moment from 'moment';
import 'moment/locale/es';
import './planner.css';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import CustomEvent from '../components/Customevent';
import axios from 'axios';

function Planner() {

    const localizer = momentLocalizer(moment);
    const [rutinasDisponibles, setRutinasDisponibles] = useState([]); // Rutinas disponibles para el usuario almacenadas
    const [idPLanner, setIdPlanner] = useState(null); // Id del planner seleccionado para hacer get a api
    const [plannerInfo, setPLannerInfo] = useState([]); // Información del planner seleccionado


    let handleRutina = async (event) => {

        const bodyParameters = {
            genero: 'Femenino',
            objetivo: 'Bajar de peso',
            atributo_fisico: 'Fuerza',
        };
  
        const gender = bodyParameters.genero;
        const objetivo = bodyParameters.objetivo;
        const attribute = bodyParameters.atributo_fisico;
  
  
        const apiUrl = `${import.meta.env.VITE_BACKEND_URL}/rutinas/${gender}/${objetivo}/${attribute}`;
  
        // Realizar la solicitud GET con Axios
        axios.get(apiUrl)
        .then(response => {
          setRutinasDisponibles(response.data);
          console.log('Rutinas disponibles:', rutinasDisponibles)
  
          // Acceder a cada rutina individual dentro del array
          response.data.forEach(rutina => {
            // Acceder a cada propiedad de la rutina
            const nombreRutina = rutina.nombre_rutina;
            const genero = rutina.genero;
            const objetivo = rutina.objetivo;
            const atributoFisico = rutina.atributo_fisico;
            const dificultad = rutina.dificultad_rutina;
            const id = rutina.id;
          });
          
        })
        .catch(error => {
          console.error('Hubo un error:', error);
        });
    };

    useEffect (() => {handleRutina();}, []);


    const generarEventosRutinas = () => {

        const eventosRutinas = [];

        rutinasDisponibles.forEach(rutina => {
            eventosRutinas.push({
                title: rutina.nombre_rutina,
                start: new Date(2023, 9, 10, 12, 0), // Año, mes (0-11), día, hora, minuto
                end: new Date(2023, 9, 12, 12, 0),
                descripcion: [rutina.descripcion],
                // Asegúrate de agregar las propiedades necesarias según la estructura de tus datos
            });
        });

        return eventosRutinas;
    };

    useEffect (() => {generarEventosRutinas();}, [rutinasDisponibles]);


    let getPlanner = async (event) => {

  
        setIdPlanner(1); // Id del planner seleccionado para hacer get a api, luego sera segun el usuario conectado
        const apiUrl = `${import.meta.env.VITE_BACKEND_URL}/planners/${idPLanner}`;
  
        // Realizar la solicitud GET con Axios
        axios.get(apiUrl)
        .then(response => {
          setPLannerInfo(response.data);
          console.log('planner:', plannerInfo)
  
          
          
        })
        .catch(error => {
          console.error('Hubo un error:', error);
        });
    };

    useEffect (() => {getPlanner();}, []);
                

      
    
    return (

        <div className='main-planner-container' id='planner-div-mpc'>
                <h1>Planner</h1>
            <div className='planner-container' id='planner-div-pc'>
                
                <Calendar id='planner-calendar'
                    localizer={localizer}
                    events={generarEventosRutinas()}
                    startAccessor="start"
                    endAccessor="end"
                    components={{
                        event: CustomEvent,
                    }}
                />
            
            </div>

        </div>

    );  
}

export default Planner;