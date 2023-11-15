  import React, { useState, useEffect  } from 'react';
  import './crear-rutina.css';
  import { NavLink } from 'react-router-dom';


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

  // Hecho con ayuda de ChatGPT
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

      let [id_rutina, setIdRutina] = useState(); 
      let [ejerciciosRutina, setEjerciciosRutina] = useState([]);

      let [mostrarEjercicios, setMostrarEjercicios] = useState(false); // Para mostrar los ejercicios de la rutina seleccionada por el usuario
      let [msjBoton, setMsjBoton] = useState('Buscar');

    
      let imagenes = {
        Masculino: {
          default: hombre, // Imagen por defecto de hombre
          states: [hombre1, hombre2, hombre3], // Opciones de estado físico para hombre
        },
        Femenino: {
          default: mujer, // Imagen por defecto de mujer
          states: [mujer1, mujer2, mujer3], // Opciones de estado físico para mujer
        },

      };

      const atributo = ['Fuerza', 'Agilidad', 'Cardio', 'Flexibilidad'];
      const objetivo = ['Bajar de peso', 'Ganancia de masa muscular','Definición' ];

      let checkAllFieldsCompleted = () => {
          if (gender && physicalState && attribute) {
            setAllFieldsCompleted(true);
          } else {
            setAllFieldsCompleted(false);
          }
        };
    
      let handleGenderChange = (newGender) => {
        setGender(newGender);
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
          const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/rutinas`);
      
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
          const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/rutinas/${rutinaId}/ejercicios`);
          const { ejercicios } = response.data;
          setEjerciciosRutina(ejercicios);
          setMostrarEjercicios(true)
        } catch (error) {
          console.error('Error al obtener los ejercicios de la rutina:', error);
        }

      };


      return (
          <div className='body-container'>
          <div className='rutinas-container'>
          <h2>Selecciona un género:</h2>
          <div>
            <Button onClick={() => handleGenderChange('Masculino')}label={'Masculino'} 
            isSelected={gender === 'masculino'}/>

            <Button onClick={() => handleGenderChange('Femenino')}label={'Femenino'}
            isSelected={gender === 'femenino'}/>
          </div>
    
          {gender && (//requerir haber clickeado algun género
            <div>
              <Image img src={imagenes[gender].default} alt={`Imagen por defecto de ${gender}`} />
            </div>
          )}
    
          {gender && (//requerir haber clickeado algun género
            <div>
              <h2>Selecciona tu objetivo:</h2>
              {imagenes[gender].states.map((state, index) => (
                <Button key={index} onClick={() => handlePhysicalStateChange(state, objetivo[index])} label ={objetivo[index]}
                isSelected={physicalState === state}/>
              ))}
            </div>
            
          )}
          {gender && physicalState &&(
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

          {gender && physicalState && (
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
                  <NavLink to={`/planner`} className={'boton-a-planner'}>Ver en planner</NavLink>
                  
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

      </div>
    

      );
              }
    
    export default Images;