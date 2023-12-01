import React, { useState, useEffect, useContext } from 'react';
  import './crear-rutina.css';
  import { NavLink, useNavigate } from 'react-router-dom';
  import TimePicker from 'react-time-picker';
  import { AuthContext } from '../auth/authContext';

  import Button from '../components/button'; 
  import Image from '../components/images';

  import mujer1 from '../../public/images/mujer_bajar_de_peso.webp';
  import mujer2 from '../../public/images/mujer_definición.webp'; 
  import mujer3 from '../../public/images/mujer_volumen.webp';
  import mujer from '../../public/images/mujer.png';

  import hombre1 from '../../public/images/hombre_bajar_de_peso.webp';
  import hombre2 from '../../public/images/hombre_definición.webp'; 
  import hombre3 from '../../public/images/hombre_volumen.webp';
  import hombre from '../../public/images/hombre.png';

  import strenght from '../../public/images/muscle.png';
  import agility from '../../public/images/running.png';
  import cardio from '../../public/images/heart.png';
  import flexibility from '../../public/images/yoga.png';

  import axios from 'axios';
  import { set } from 'date-fns';
  import API_URL from '../config';

  

  function Images() {
      let [gender, setGender] = useState(null); // Inicialmente, no se selecciona ningún género
      let [physicalState, setPhysicalState] = useState(null); // Estado físico seleccionado, null al principio
      let [attribute, setAttribute] = useState(null); // Atributos que se escogen (fuerza, velocidad, etc).
      let [allFieldsCompleted, setAllFieldsCompleted] = useState(false); //Para que cuand complete todo, recién ahí le aparezca el botón guardar

      let [estadoFisico_api, setEstadoFisico] = useState(null); // Estado físico seleccionado, null al principio, para hacer get a api
      let [objetivo_api, setObjetivo] = useState(null); // Objetivo seleccionado, null al principio, para hacer get a api

      let [rutinasDisponibles, setRutinasDisponibles] = useState([]); // Rutinas disponibles para el usuario almacenadas
      let [mostrarRutinas, setMostrarRutinas] = useState(false); // Para mostrar las rutinas disponibles
      let [RutinaEjercicios, setRutinaEjercicios] = useState([]); // Rutinas disponibles para el usuario almacenadas

      let [IdRutina, setIdRutina] = useState(); 
      let [ejerciciosRutina, setEjerciciosRutina] = useState([]);

      let [mostrarEjercicios, setMostrarEjercicios] = useState(false); // Para mostrar los ejercicios de la rutina seleccionada por el usuario
      let [msjBoton, setMsjBoton] = useState('Buscar');

      let [alertaHoraNula, setAlertaHoraNula] = useState(false); // Para mostrar los ejercicios de la rutina seleccionada por el usuario
      let [horariosCorrectos, setHorariosCorrectos] = useState(false); // Para mostrar los ejercicios de la rutina seleccionada por el usuario

      let [msgConfirmacion, setMsgConfirmacion] = useState('Confirmar horarios'); // Para mostrar los ejercicios de la rutina seleccionada por el usuario

      const [usuarios, setUsuarios] = useState({}); // Estado inicial vacío
      const navigate = useNavigate();
    
      const {token, logout} = useContext(AuthContext);
      const [IdUsuario, setIdUsuario] = useState(null);
      const [UsuarioActual, setUsuarioActual] = useState(null);

      const [plannerIdInfo, setPLannerIdInfo] = useState([]); // Información del planner seleccionado
      const [idPLanner, setIdPlanner] = useState(null); // Id del planner seleccionado para hacer get a api

      const [mostrarBotonPlanner, setMostrarBotonPlanner] = useState(false); // Para mostrar el botón de ver en planner
      const [hacerPatch, setHacerPatch] = useState(false); // Para mostrar el botón de ver en planner


    useEffect(() => {
      const getUserId = async () => {
        try {
          if (token){
          const response = await axios.get(`${API_URL}/auth/currentUsuario/token`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          setIdUsuario(response.data.idUsuario);
        }
        } catch (error) {
          console.error(error);
        }
      };
  
      const getUser = async () => {
        try {
          const response = await axios.get(`${API_URL}/usuarios/${IdUsuario}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
            });
          setUsuarioActual(response.data);
          setGender(response.data.genero)

          console.log('getUser: usuario obtenido segun id');
        } catch (error) {
          alert(error);
        }
      };
  
      if (IdUsuario) {
        getUser();
        
      } else {
        getUserId();
      }
    }, [IdUsuario],[UsuarioActual], [gender]);


  useEffect(() => {
    const getPlanner = async () => {
      try {
        const response = await axios.get(`${API_URL}/planners/user/${IdUsuario}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        // Utiliza la respuesta directamente en lugar de almacenarla en un estado intermedio
        const plannerId = response.data.planner.id;
        setIdPlanner(plannerId);
  
        
      } catch (error) {
        console.error('Hubo un error:', error);
      }
    };
  
    if (IdUsuario) {
      getPlanner();
    }
  }, [IdUsuario, token]);

  

      let imagenes = {
        masculino: {
          default: hombre, // Imagen por defecto de hombre
          states: [hombre1, hombre2, hombre3], // Opciones de estado físico para hombre
        },
        femenino: {
          default: mujer, // Imagen por defecto de mujer
          states: [mujer1, mujer2, mujer3], // Opciones de estado físico para mujer
        },

      };

      const atributo = ['Fuerza', 'Agilidad', 'Cardio', 'Flexibilidad'];
      const objetivo = ['Bajar de peso', 'Ganancia de masa muscular','Definición' ];


      let checkAllFieldsCompleted = () => {
          if (UsuarioActual && UsuarioActual.genero && physicalState && attribute) {
            setAllFieldsCompleted(true);
          } else {
            setAllFieldsCompleted(false);
          }
        };
    
      let handleGenderChange = () => {
        setGender();
        setPhysicalState(null); // Reiniciar el estado físico cuando se cambie el género
        setAttribute(null); // Reiniciar el atributo físico cuando se cambie el género
        setMsjBoton('Buscar');

      };
    
      let handlePhysicalStateChange = (newState, nombre) => {
        setPhysicalState(newState);
        setEstadoFisico(nombre);
        setMsjBoton('Buscar');

      };

      let handleAttributeChange = (newAttribute) => {
          setAttribute(newAttribute);
          setMsjBoton('Buscar');

        };

      useEffect(() => {checkAllFieldsCompleted();}, [gender, physicalState, objetivo]);

      let handleGetRutina = async () => {
        try {
          // 1. Obtener todas las rutinas disponibles
          const response = await axios.get(`${API_URL}/rutinas`);
      
          const todasLasRutinas = response.data;
      
          // 2. Filtrar las rutinas según el género, objetivo y atributo físico seleccionados por el usuario
          const rutinasFiltradas = todasLasRutinas.filter((rutina) => {
            return (
              rutina.genero.toLowerCase() === gender.toLowerCase() &&
              rutina.objetivo.toLowerCase() === estadoFisico_api.toLowerCase() &&
              rutina.atributo_fisico.toLowerCase() === attribute.toLowerCase()
            );
          });
      
          if (rutinasFiltradas.length === 0) {
            console.log('No hay rutinas disponibles con los criterios seleccionados.');
            return;
          }
          setRutinasDisponibles(rutinasFiltradas);
          setMostrarRutinas(true);
      
          // 4. Obtener el ID de la primera rutina filtrada
          const idDeRutina = rutinasFiltradas[0].id;
      
          // 5. Establecer el ID de la rutina
          setIdRutina(idDeRutina);
      
          // 6. Manejar los ejercicios después de que se haya actualizado el estado
          await handleGetEjercicios(idDeRutina);

        } catch (error) {
          console.error('Error al obtener las rutinas disponibles:', error);
        }
      };

      let handleGetEjercicios = async (rutinaId) => {
        try {
          const response = await axios.get(`${API_URL}/rutinas/${rutinaId}/ejercicios`);
          let { ejercicios } = response.data;
          setEjerciciosRutina(ejercicios);
          setMostrarEjercicios(true)
        } catch (error) {
          console.error('Error al obtener los ejercicios de la rutina:', error);
        }

      };

      let handleSetHorarios = async () => {
        try {
          // Crear un objeto para almacenar los horarios de la rutina seleccionada
          const horarios = {};
          
          // Iterar sobre los días y agregar los horarios y el estado del checkbox correspondientes
          Object.keys(times).forEach((day) => {
            horarios[day.toLowerCase()] = {
              checked: times[day].checked,
              time: times[day].checked ? parseInt(times[day].time.split(':')[0]) : null,
            };
          });
      
          // Mostrar los horarios en la consola (puedes eliminar esta línea en producción)
          console.log('Horarios:', horarios, 'tipo:', typeof horarios);

          let dias_entrenamiento = [];
          let dataBody = {};

          for (const day in horarios) {
            if (horarios.hasOwnProperty(day)) {
              const horario = horarios[day];
              console.log('horario.time:', horario.time, 'tipo:', typeof horario.time);

              // Realiza las acciones que necesitas con cada día y sus horarios aquí
              if (horario.checked && horario.time === null) {
                // si esta checkeado el dia pero no tiene hora
                alert('Debes seleccionar una hora para los días que quieras entrenar');
              }

              else if (horario.checked && horario.time >= 0 && horario.time <= 23) {
                // si esta checkeado y tiene hora
                dias_entrenamiento.push(day);  
                setHacerPatch(true);              
              }

              else if (!horario.checked && !horario.time) {
                // si no esta checkeado y no tiene hora
              }

              else if (!horario.checked && horario.time) {
                // si no esta checkeado y tiene hora
                // caso imposible
                alert('Debes seleccionar una hora para los días que quieras entrenar');
                console.log('Revisar caso imposible');
              }
            }
          }

          if (dias_entrenamiento.length >= 1) {
            // Si todos los horarios fueron ingresados correctamente...
            console.log(`hay horarios: hacer patch a planner de:`, horarios);
            // Realizar la solicitud PATCH con Axios

            const data = {
              horarios: horarios,
              IdRutina: IdRutina,
            }

            const url = `${API_URL}/planners/times/${idPLanner}`;
            axios.patch(url, data, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            })
            .then((response) => {
              // Manejar la respuesta exitosa
              setMostrarBotonPlanner(true);
              console.log('Planner actualizado exitosamente:', response.data);
              
            })
            .catch((error) => {
              // Manejar errores
              console.error('Error al actualizar el planner:', error);
              });

            setHorariosCorrectos(false);
            return;
          }
                
        } catch (error) {
          console.error('Error al establecer los horarios de la rutina:', error);
        }
      };

      const [times, setTimes] = useState({
        Lunes: { checked: false, time: '0:00' },
        Martes: { checked: false, time: '0:00' },
        Miercoles: { checked: false, time: '0:00' },
        Jueves: { checked: false, time: '0:00' },
        Viernes: { checked: false, time: '0:00' },
        Sabado: { checked: false, time: '0:00' },
        Domingo: { checked: false, time: '0:00' },
      });
    
      const handleCheckboxChange = (day) => {
        setTimes((prevTimes) => {
          const updatedTimes = { ...prevTimes };
          updatedTimes[day].checked = !updatedTimes[day].checked;
    
          return updatedTimes;
        });
      };
    
      const handleTimeChange = (day, event) => {
        const value = event.target.value;
        
        if (value)
        setTimes((prevTimes) => {
          const updatedTimes = { ...prevTimes };
          updatedTimes[day].time = value;
    
          return updatedTimes;
        });
      };

      return (
          <div className='body-container'>
          <div className='rutinas-container'>
    
        
          {UsuarioActual && UsuarioActual.genero && (//requerir haber clickeado algun género
            <div>
              <h2>Selecciona tu objetivo:</h2>
              {imagenes[UsuarioActual.genero].states.map((state, index) => (
                <Button key={index} onClick={() => handlePhysicalStateChange(state, objetivo[index])} label ={objetivo[index]}
                isSelected={physicalState === state}/>
              ))}
            </div>
            
          )}
          {UsuarioActual && UsuarioActual.genero && physicalState &&(
              <div>
                  <h2>Imagen seleccionada:</h2>
                  {physicalState ? (
                  <div>
                      <Image src={physicalState} alt="Imagen seleccionada" />
                  </div>
                  ) : ( //se usa para evaluar una condición. Si physicalstate es verdader, entonces renderiza y muetsra la img
                  <p>Selecciona un estado físico</p>
              )}
              </div>
          
          )}

          {UsuarioActual && UsuarioActual.genero && physicalState && (
          <div>
              <h2>Selecciona un atributo físico:</h2>
              {atributo.map((attr, index) => (
              <Button key={index} onClick={() => handleAttributeChange(attr)}
                  label = {attr}
                  isSelected={attribute === attr}
                  value={attr}
                  onChange={(e) => setObjetivo(e.target.value)}
                  />
              ))}
              <div>
              {attribute && (
                  <div>
                  {/* <p>{`Atributo físico seleccionado: ${attribute}`}</p>*/}
                  {attribute === 'Fuerza' && <Image src={strenght} alt="Fuerza" />}
                  {attribute === 'Agilidad' && <Image src={agility} alt="Agilidad" />}
                  {attribute === 'Cardio' && <Image src={cardio} alt="Cardio" />}
                  {attribute === 'Flexibilidad' && <Image src={flexibility} alt="Flexibilidad" />}
                  </div>
              )}
              </div>
          </div>)}
          
          </div>
          {allFieldsCompleted && <button className="guardar-button" onClick={handleGetRutina}>{msjBoton}</button>}
          

          {mostrarRutinas && (
            <div className='rutinas-container'>
              <h2>Rutinas disponibles:</h2>
              {rutinasDisponibles.map((rutina, index) => (
                <div key={index} className='rutinas-disponibles-container'>
                
                  <p>{`Nombre: ${rutina.nombre_rutina}`}</p>
                  <p>{`Descripción: ${rutina.descripcion}`}</p>
                  <p>{`Género: ${rutina.genero}`}</p>
                  <p>{`Objetivo: ${rutina.objetivo}`}</p>
                  <p>{`Atributo físico: ${rutina.atributo_fisico}`}</p>
                  <p>{`Dificultad: ${rutina.dificultad_rutina}`}</p>
                  {/* <NavLink to={`/planner`} className={'boton-a-planner'}>Ver en planner</NavLink> */}
                  
                </div>
              ))}
            </div>
          )}


          
          {mostrarRutinas && mostrarEjercicios && (
            <div className='rutinas-container'>
              <h2>Ejericios:</h2>
              {ejerciciosRutina.map((rutina, index) => (
                <div key={index} className='rutinas-disponibles-container'>
                  <p>{`${rutina.nombre_ejercicio} | Dificultad: ${rutina.dificultad} | Grupo(s) muscular(es): ${rutina.grupo_muscular} | Descripción: ${rutina.descripcion}`}</p>   
                </div>
              ))}
          
            </div>
            
          )}


          {mostrarRutinas && mostrarEjercicios && (
            <div className='rutinas-container'>
              <h2>Horarios:</h2>

              <table className='tabla-horarios-rutina' border="1">
                    <thead>
                      <tr>
                        <th>Día</th>
                        <th>Entreno (Si/No)</th>
                        <th>Hora</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.keys(times).map((day) => (
                        <tr key={day} className={times[day].checked ? 'row-checked' : ''}>
                          <td>{day}</td>
                          <td>
                            <input
                              type="checkbox"
                              checked={times[day].checked}
                              onChange={() => handleCheckboxChange(day)}
                            />
                          </td>
                          <td className='time-picker-rutina'>
                            {times[day].checked && (
                              <select
                                className='select-horarios-rutina'
                                value={times[day].time}
                                onChange={(event) => handleTimeChange(day, event)}
                              >
                                {[...Array(24).keys()].map((hour) => (
                                  <option key={hour} value={`${hour}:00`}>
                                    {`${hour}:00`}
                                  </option>
                                ))}
                              </select>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>



              <button className="horarios-button" onClick={handleSetHorarios}>Confirmar horarios y rutina</button>
              

          
            </div>
            
          )}


          {mostrarRutinas && mostrarEjercicios && mostrarBotonPlanner && (
            <div className='rutinas-container'>
              
              <NavLink to={`/planner`} className={'boton-a-planner'}>Ver en planner</NavLink>

            </div>
            
          )}

      </div>
    

      );
              }
    
    export default Images;