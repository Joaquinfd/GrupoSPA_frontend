import React, { useState, useEffect, useContext } from 'react';
import './perfil.css'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../auth/authContext';


function Perfil() {
    // Estado para controlar la visibilidad de las opciones
    const [mostrarOpciones, setMostrarOpciones] = useState(false);
    const [mostrarDivision, setMostrarDivision] = useState(false);
    const [imagenSeleccionada, setImagenSeleccionada] = useState(null);
    const [textoBoton, setTextoBoton] = useState('');
    const [usuarios, setUsuarios] = useState({}); // Estado inicial vacío
    
    const {token, setToken} = useContext(AuthContext);
    const [IdUsuario, setIdUsuario] = useState(null);
    const [UsuarioActual, setUsuarioActual] = useState(null);


    useEffect(() => {
      const getUserId = async () => {
        try {
          const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/usuarios/currentUsuario/token`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          setIdUsuario(response.data.idUsuario);
        } catch (error) {
          console.log(error);
        }
      };
  
      const getUser = async () => {
        try {
          const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/usuarios/${IdUsuario}`);
          setUsuarioActual(response.data);
        
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


    const deleteUsuario = async (event) => {

      const enlace_delete = `${import.meta.env.VITE_BACKEND_URL}/usuarios/14`;
      axios.delete(enlace_delete) // Modificar el enlace segun corresponda
      .then(response => {
          console.log(response.data);
          setUsuarios(response.data);
          console.log(usuarios);
      }
      )
      .catch(error => {
          console.error(error);
      }
      );
    }
    return (
        <>
        <div className='perfil-container'>
            <div className='Foto-de-perfil'>
            <h1>Mi Perfil</h1>
                <img src="images/perfil.jpeg" alt="Foto de perfil" />
            </div>

            {UsuarioActual ? (
          <div className='Datos-de-perfil'>
            <h2>Nombre:</h2>
            <p>{UsuarioActual.nombre_usuario}</p>
            <h2>Edad</h2>
            <p>{UsuarioActual.edad}</p>
            <h2>Sexo</h2>
            <p>{UsuarioActual.genero}</p>
            <h2>Peso</h2>
            <p>{UsuarioActual.peso}</p>
            <h2>Objetivo</h2>
            <p>{UsuarioActual.objetivo}</p>
          </div>
        ) : (
          <div className='Datos-de-perfil'>
          <h2>Nombre</h2>
          <h2>Edad</h2>
          <h2>Sexo</h2>
          <h2>Peso</h2>
          <h2>Objetivo</h2>
          </div>
        )}

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
        </div>)}
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
            <div><a href="#división-oculta" onClick={() => { deleteUsuario() }}>Eliminar cuenta</a></div>
            </div>
          )}
        </div>
        </div>


       {/*<div className='Disclaimer'>
       <p>- Solo si esta ingresado se podra ver. Tendrá la configuración elegida en el inicio por la persona, y tendrá la opción de editar los planes.</p>

      <p>- Se podrá ajustar acá el uso de notificaciones.</p>
          </div>*/}
        </>
    );  
}

export default Perfil;