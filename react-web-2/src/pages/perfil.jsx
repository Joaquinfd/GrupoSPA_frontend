import React, { useState } from 'react';
import './perfil.css'
import { Link } from 'react-router-dom';
function Perfil() {
    // Estado para controlar la visibilidad de las opciones
    const [mostrarOpciones, setMostrarOpciones] = useState(false);
    const[mostrarDivision, setMostrarDivision] = useState(false);
    const [imagenSeleccionada, setImagenSeleccionada] = useState(null);
    const[textoBoton, setTextoBoton] = useState('');

    // Función para alternar la visibilidad de las opciones al hacer clic en el botón de ajustes
    const toggleOpciones = () => {
      setMostrarOpciones(!mostrarOpciones);
      
    
    };

    const mostrarOcultarDivision = () => {
      setMostrarDivision(!mostrarDivision);
    };

    const scrollToDivision = () => {
      if (mostrarDivision) {
        const divisionElement = document.getElementById('división-oculta');
        if (divisionElement) {
          divisionElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    const handleBotonClick = (imagen,nuevoTexto) => {
      // Actualiza el estado de la imagen seleccionada
      setImagenSeleccionada(imagen);
      setTextoBoton(nuevoTexto);
    };
    
    const ocultarDivision = () => {
      setMostrarDivision(false);
  };
   
  
    return (
        <>

        <div className='perfil-container'>

            
            <div className='Foto-de-perfil'>
            <h1>Mi Perfil</h1>
                <img src="images/perfil.jpeg" alt="Foto de perfil" />
            </div>

            <div className='Datos de perfil'>
                <h2>Nombre</h2>
                <p>Nombre de usuario</p>
                <h2>Edad</h2>
                <p>Edad de usuario</p>
                <h2>Sexo</h2>
                <p>Sexo de usuario</p>
                <h2>Altura</h2>
                <p>Altura de usuario</p>
                <h2>Peso</h2>
                <p>Peso de usuario</p>
                <h2>Objetivo</h2>
                <p>Objetivo de usuario</p>
                <h2>Atributo de enfoque</h2>
                <p>Atributo de enfoque de usuario</p>
            
            
            
            </div>
        <div className='Dificultad' id ='división-oculta'>
        {mostrarDivision && (
          <div className="division-oculta">
            <h2>Dificultad</h2>
            <div className='botones'
            ><button onClick={() => handleBotonClick('../../public/images/facil.png', 'Fácil')}> Fácil</button>
              <button onClick={() => handleBotonClick('../../public/images/intermedio.png', 'Intermedio')}> Intermedio</button>
              <button onClick={() => handleBotonClick('../../public/images/dificil.png', 'Difícil')}> Díficil</button></div>
            
            <h3>Dificultad seleccionada</h3>
            <h4>{textoBoton}</h4>
            {imagenSeleccionada && <img src={imagenSeleccionada} alt="Imagen seleccionada" style={{width: '150px', height: '150px'}} />}

            <button className='Hecho' onClick={ocultarDivision}> Hecho</button>

        </div>
)}

        </div>


        <div className='boton-ajustes-container'>
          <button className='boton-ajustes' onClick={toggleOpciones}>
            Ajustes
          </button>
          {mostrarOpciones && (
            <div className='opciones'>
            <div><Link to='/notificaciones'>Notificaciones</Link></div>
            <div><Link to='/crear-rutina'>Modificar Objetivos</Link></div>
            <div><a href="#división-oculta" onClick={() => { mostrarOcultarDivision(); scrollToDivision(); }}>Ajustar Dificultad</a></div>
            </div>
          )}
        </div>


            
        </div>


       <div className='Disclaimer'>
       <p>- Solo si esta ingresado se podra ver. Tendrá la configuración elegida en el inicio por la persona, y tendrá la opción de editar los planes.</p>

      <p>- Se podrá ajustar acá el uso de notificaciones.</p>
           </div>
        </>
    );  
}

export default Perfil;