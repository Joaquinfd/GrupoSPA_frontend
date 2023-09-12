import React, { useState } from 'react';

import mujer1 from '../../public/images/mujer_bajar_de_peso.webp';
import mujer2 from '../../public/images/mujer_definición.webp'; 
import mujer3 from '../../public/images/mujer_volumen.webp';
import mujer from '../../public/images/mujer.jpg';

import hombre1 from '../../public/images/hombre_bajar_de_peso.webp';
import hombre2 from '../../public/images/hombre_definición.webp'; 
import hombre3 from '../../public/images/hombre_volumen.webp';
import hombre from '../../public/images/hombre.jpg';

import strenght from '../../public/images/muscle.png';
import agility from '../../public/images/running.png';
import cardio from '../../public/images/heart.png';
import flexibility from '../../public/images/yoga.png';

// Hecho con ayuda de ChatGPT
function Images() {
    let [gender, setGender] = useState(null); // Inicialmente, no se selecciona ningún género
    let [physicalState, setPhysicalState] = useState(null); // Estado físico seleccionado, null al principio
    let [attribute, setAttribute] = useState(null); // Atributos que se escogen (fuerza, velocidad, etc).
  
    let imagenes = {
      male: {
        default: hombre, // Imagen por defecto de hombre
        states: [hombre1, hombre2, hombre3], // Opciones de estado físico para hombre
      },
      female: {
        default: mujer, // Imagen por defecto de mujer
        states: [mujer1, mujer2, mujer3], // Opciones de estado físico para mujer
      },

    };

    const atributos = ['Fuerza', 'Velocidad', 'Cardio', 'Flexibilidad'];
  
    let handleGenderChange = (newGender) => {
      setGender(newGender);
      setPhysicalState(null); // Reiniciar el estado físico cuando se cambie el género
      setAttribute(null); // Reiniciar el atributo físico cuando se cambie el género

    };
  
    let handlePhysicalStateChange = (newState) => {
      setPhysicalState(newState);
    };

    let handleAttributeChange = (newAttribute) => {
        setAttribute(newAttribute);
      };
  
    return (
      <div>
        <h2>Selecciona un género:</h2>
        <div>
          <button onClick={() => handleGenderChange('male')}>Masculino</button>
          <button onClick={() => handleGenderChange('female')}>Femenino</button>
        </div>
  
        {gender && (//requerir haber clickeado algun género
          <div>
            <img src={imagenes[gender].default} alt={`Imagen por defecto de ${gender}`} />
          </div>
        )}
  
        {gender && (//requerir haber clickeado algun género
          <div>
            <h2>Selecciona un estado físico:</h2>
            {imagenes[gender].states.map((state, index) => (
              <button key={index} onClick={() => handlePhysicalStateChange(state)}>
                Estado {index + 1}
              </button>
            ))}
          </div>
        )}

        <h2>Imagen seleccionada:</h2>
        {physicalState ? (
        <div>
          <img src={physicalState} alt="Imagen seleccionada" />
        </div>
            ) : (
            <p>Selecciona un estado físico</p>
        )}

{gender && physicalState && (
  <div>
    <h2>Selecciona un atributo físico:</h2>
    {atributos.map((attr, index) => (
      <button key={index} onClick={() => handleAttributeChange(attr)}>
        {attr}
      </button>
    ))}
    <div>
      {attribute && (
        <div>
          <p>{`Atributo físico seleccionado: ${attribute}`}</p>
          {attribute === 'Fuerza' && <img src={strenght} alt="Fuerza" />}
          {attribute === 'Velocidad' && <img src={agility} alt="Velocidad" />}
          {attribute === 'Cardio' && <img src={cardio} alt="Cardio" />}
          {attribute === 'Flexibilidad' && <img src={flexibility} alt="Flexibilidad" />}
        </div>
      )}
    </div>
  </div>
)}
  

        </div>
    );
  }
  
  export default Images;