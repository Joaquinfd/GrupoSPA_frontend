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

    };
  
    let handlePhysicalStateChange = (newState, nombre) => {
      setPhysicalState(newState);
      setEstadoFisico(nombre);
    };

    let handleAttributeChange = (newAttribute) => {
        setAttribute(newAttribute);
      };

    useEffect(() => {checkAllFieldsCompleted();}, [gender, physicalState, objetivo]);

    let handleCreateRutina = async (event) => {

      const bodyParameters = {
          gender: gender,
      };

      console.log(bodyParameters);

      axios.get('http://localhost:3000/rutinas', {
        params: bodyParameters,
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
          console.log(response.data);
      })
      .catch(error => {
          console.error('There was a problem with the request:', error);
      });
      
      console.log(gender, estadoFisico_api, attribute);
    };


  
  
    return (
        <div className='body-container'>
        <div className='rutinas-container'>
        <h2>Selecciona un género:</h2>
        <div>
          <Button onClick={() => handleGenderChange('masculino')}label={'Masculino'} 
          isSelected={gender === 'masculino'}/>

          <Button onClick={() => handleGenderChange('femenino')}label={'Femenino'}
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
        {allFieldsCompleted && (<NavLink to="/mi-perfil" className="guardar-button-link"><button className="guardar-button" onClick={handleCreateRutina}>Guardar</button></NavLink>
)}        </div>

    );
            }
  
  export default Images;