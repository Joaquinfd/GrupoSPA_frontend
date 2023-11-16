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

  
        const apiUrl = `${import.meta.env.VITE_BACKEND_URL}/planners/user/${IdUsuario}`;
  
        // Realizar la solicitud GET con Axios
        axios.get(apiUrl, {
            headers: {
              Authorization: `Bearer ${token}`
            }
            
        })
        .then(response => {
          setPLannerIdInfo(response.data);
          console.log('planner:', plannerIdInfo);
          console.log('planner id:', plannerIdInfo.planner.id);

          setIdPlanner(plannerIdInfo.planner.id);
          console.log('idPlanner seteado:', idPLanner);
  
          
          
        })
        .catch(error => {
          console.error('Hubo un error:', error);
        });

        axios.get(`${import.meta.env.VITE_BACKEND_URL}/planners/${idPLanner}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
            
        })
        .then(response => {
          setPLannerInfo(response.data);
          console.log('planner de get planner por id_planner:', plannerInfo);
          console.log('planner de get planner por id_planner:', plannerInfo.ejercicios);
          
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