import React, { useState, useCallback, useEffect, useContext } from 'react';
import moment from 'moment';
import 'moment/locale/es';
import './planner.css';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import CustomEvent from '../components/Customevent';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../auth/authContext';
import { set } from 'date-fns';
import { id } from 'date-fns/locale';

function Planner() {

    const localizer = momentLocalizer(moment);
    const [rutinasDisponibles, setRutinasDisponibles] = useState([]); // Rutinas disponibles para el usuario almacenadas
    const [idPLanner, setIdPlanner] = useState(null); // Id del planner seleccionado para hacer get a api
    const [plannerInfo, setPLannerInfo] = useState([]); // Información del planner seleccionado

    const [usuarios, setUsuarios] = useState({}); // Estado inicial vacío
    const navigate = useNavigate();
    
    const {token, logout} = useContext(AuthContext);
    const [IdUsuario, setIdUsuario] = useState(null);
    const [UsuarioActual, setUsuarioActual] = useState(null);

    const [plannerIdInfo, setPLannerIdInfo] = useState([]); // Información del planner seleccionado


    useEffect(() => {
      const getUserId = async () => {
        try {
          if (token){
          const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth/currentUsuario/token`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          setIdUsuario(response.data.idUsuario);
        }
        } catch (error) {
          console.log(error);
        }
      };
  
      const getUser = async () => {
        try {
          const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/usuarios/${IdUsuario}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
            });
          setUsuarioActual(response.data);
          

          console.log('getUser:', response.data);
        } catch (error) {
          alert(error);
        }
      };
  
      if (IdUsuario) {
        getUser();
      } else {
        getUserId();
      }
    }, [IdUsuario]);



    // let handleRutina = async (event) => {

    //     const bodyParameters = {
    //         genero: 'Femenino',
    //         objetivo: 'Bajar de peso',
    //         atributo_fisico: 'Fuerza',
    //     };
  
    //     const gender = bodyParameters.genero;
    //     const objetivo = bodyParameters.objetivo;
    //     const attribute = bodyParameters.atributo_fisico;

  
  
    //     const apiUrl = `${import.meta.env.VITE_BACKEND_URL}/rutinas/${gender}/${objetivo}/${attribute}`;
  
    //     // Realizar la solicitud GET con Axios
    //     axios.get(apiUrl)
    //     .then(response => {
    //       setRutinasDisponibles(response.data);
    //       console.log('Rutinas disponibles:', rutinasDisponibles)
  
    //       // Acceder a cada rutina individual dentro del array
    //       response.data.forEach(rutina => {
    //         // Acceder a cada propiedad de la rutina
    //         const nombreRutina = rutina.nombre_rutina;
    //         const genero = rutina.genero;
    //         const objetivo = rutina.objetivo;
    //         const atributoFisico = rutina.atributo_fisico;
    //         const dificultad = rutina.dificultad_rutina;
    //         const id = rutina.id;
    //       });
          
    //     })
    //     .catch(error => {
    //       console.error('Hubo un error:', error);
    //     });
    // };

    // useEffect (() => {handleRutina();}, []);


    // const generarEventosRutinas = () => {

    //     const eventosRutinas = [];

    //     rutinasDisponibles.forEach(rutina => {
    //         eventosRutinas.push({
    //             title: rutina.nombre_rutina,
    //             start: new Date(2023, 9, 10, 12, 0), // Año, mes (0-11), día, hora, minuto
    //             end: new Date(2023, 9, 12, 12, 0),
    //             descripcion: [rutina.descripcion],
    //             // Asegúrate de agregar las propiedades necesarias según la estructura de tus datos
    //         });
    //     });

    //     return eventosRutinas;
    // };

    // useEffect (() => {generarEventosRutinas();}, [rutinasDisponibles]);

    const generarEventosRutinas = () => {
      console.log('dentro de generarEventosRutinas AHORA', plannerInfo.dias);
      const eventosRutinas = [];
    
      plannerInfo.dias &&
        Object.entries(plannerInfo.dias).forEach(([dia, hora]) => {
          if (hora !== null) {
            // Mapear días de la semana a números (0-6)
            const numeroDia = {
              domingo: 0,
              lunes: 1,
              martes: 2,
              miercoles: 3,
              jueves: 4,
              viernes: 5,
              sabado: 6,
            }[dia.toLowerCase()];
    
            if (numeroDia !== undefined) {
              // Obtener las rutinas asociadas para el día actual
              const rutinasAsociadas = plannerInfo.rutinas.filter(
                (rutina) => rutina[dia] !== null
              );
    
              rutinasAsociadas.forEach((rutinaAsociada) => {
                const { nombre_rutina, descripcion, dificultad_rutina } = rutinaAsociada;
                const { ejercicios } = plannerInfo;

                console.log('constantes obt',ejercicios);
                console.log([descripcion])
    
                console.log('crear evento', dia, hora, nombre_rutina, descripcion, dificultad_rutina);
    
                // // Crear un evento para cada rutina asociada
                // eventosRutinas.push({
                //   title: `${nombre_rutina} - ${descripcion} - Dificultad: ${dificultad_rutina}`,
                //   start: moment().day(numeroDia).set('hour', hora).toDate(),
                //   end: moment().day(numeroDia).set('hour', hora + 1).toDate(),
                //   // Puedes ajustar las propiedades según la estructura de tus datos
                //   // descripcion: ejercicios,
                //   ejercicios: ejercicios
                // });

                const fechaInicio = moment().startOf('week').day(numeroDia).set('hour', hora);
                const fechaFin = moment(fechaInicio).set('hour', hora + 1);

                while (fechaInicio.isBefore(moment().endOf('year').add(1, 'year'))) {
                  eventosRutinas.push({
                    title: `${nombre_rutina} - ${descripcion} - Dificultad: ${dificultad_rutina}`,
                    start: fechaInicio.toDate(),
                    end: fechaFin.toDate(),
                    ejercicios: ejercicios
                  });

                  // Avanzar al próximo domingo
                  fechaInicio.add(1, 'week');
                  fechaFin.add(1, 'week');
                }
                
              });
            }
          }
        });
      
      return eventosRutinas;
    };
    
    
    
    


    useEffect(() => {
      const getPlanner = async () => {
        try {
          const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/planners/user/${IdUsuario}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
    
          // Utiliza la respuesta directamente en lugar de almacenarla en un estado intermedio
          const plannerId = response.data.planner.id;
          setIdPlanner(plannerId);
    
          // Realiza la segunda solicitud con el ID del planner
          const plannerResponse = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/planners/${plannerId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
    
          // Utiliza la respuesta directamente
          setPLannerInfo(plannerResponse.data);
    
          // Aquí puedes realizar cualquier otra lógica basada en la información del planner
          console.log('Días de rutina:', plannerResponse.data.dias);
          console.log('Rutinas:', plannerResponse.data.rutinas);
          console.log('Ejercicios:', plannerResponse.data.ejercicios);
        } catch (error) {
          console.error('Hubo un error:', error);
        }
      };
    
      if (IdUsuario) {
        getPlanner();
      }
    }, [IdUsuario, token]);

    
                

      
    
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