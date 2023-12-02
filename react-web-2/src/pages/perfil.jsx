import React, { useState, useEffect, useContext } from 'react';
import './perfil.css'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../auth/authContext';
import API_URL from '../config';


function Perfil() {
    // Estado para controlar la visibilidad de las opciones
    const [mostrarOpciones, setMostrarOpciones] = useState(false);
    const [mostrarDivision, setMostrarDivision] = useState(false);
    const [imagenSeleccionada, setImagenSeleccionada] = useState(null);
    const [textoBoton, setTextoBoton] = useState('');
    const [usuarios, setUsuarios] = useState({}); // Estado inicial vacío
    const navigate = useNavigate();
    
    const {token, logout, setScope} = useContext(AuthContext);
    const [IdUsuario, setIdUsuario] = useState(null);
    const [UsuarioActual, setUsuarioActual] = useState(null);

    const [editandoNombre, setEditandoNombre] = useState(false);
    const [nuevoNombre, setNuevoNombre] = useState('');
    const [editandoEdad, setEditandoEdad] = useState(false);
    const [nuevaEdad, setNuevaEdad] = useState('');
    const [editandoSexo, setEditandoSexo] = useState(false);
    const [nuevoSexo, setNuevoSexo] = useState('');
    const [editandoPeso, setEditandoPeso] = useState(false);
    const [nuevoPeso, setNuevoPeso] = useState('');
    const [cambios, setCambios] = useState({});

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
          setScope(response.data.scope);
          localStorage.setItem("scope", response.data.scope);
          
        }
        } catch (error) {
          console.log(error);
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

          console.log(response.data);
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

    const deleteUsuario = async () => {
      try {
          const usuario_eliminado = await axios.delete(`${API_URL}/auth/${IdUsuario}`, {
            headers: {
            Authorization: `Bearer ${token}`
            }
        });
        logout();
        navigate('/')
      } catch (error) {
        console.log(error);
      }

    }

    // nuevas

    const habilitarEdicionNombre = () => {
      setEditandoNombre(true);
      setNuevoNombre(UsuarioActual.nombre_usuario);
    };
  
    const handleCambioNombre = (e) => {
      setNuevoNombre(e.target.value);
      setCambios((prevCambios) => ({ ...prevCambios, nombre_usuario: true }));
    };
  
    const habilitarEdicionEdad = () => {
      setEditandoEdad(true);
      setNuevaEdad(UsuarioActual.edad);
    };
  
    const handleCambioEdad = (e) => {
      setNuevaEdad(e.target.value);
      setCambios((prevCambios) => ({ ...prevCambios, edad: true }));
    };
  
    const habilitarEdicionSexo = () => {
      setEditandoSexo(true);
      setNuevoSexo(UsuarioActual.genero);
    };
  
    const handleCambioSexo = (e) => {
      setNuevoSexo(e.target.value);
      setCambios((prevCambios) => ({ ...prevCambios, genero: true }));
    };
  
    const habilitarEdicionPeso = () => {
      setEditandoPeso(true);
      setNuevoPeso(UsuarioActual.peso);
    };
  
    const handleCambioPeso = (e) => {
      setNuevoPeso(e.target.value);
      setCambios((prevCambios) => ({ ...prevCambios, peso: true }));
    };
  
    const confirmarCambios = async () => {
      const cambiosEnviados = {};
  
      if (cambios.nombre_usuario) {
        cambiosEnviados.nombre_usuario = nuevoNombre;
      }
  
      if (cambios.edad) {
        cambiosEnviados.edad = nuevaEdad;
      }
  
      if (cambios.genero) {
        cambiosEnviados.genero = nuevoSexo;
      }
  
      if (cambios.peso) {
        cambiosEnviados.peso = nuevoPeso;
      }
  
      await modifyUsuario(cambiosEnviados);
  
      setUsuarioActual((prevUsuario) => ({
        ...prevUsuario,
        ...cambiosEnviados,
      }));
  
      setEditandoNombre(false);
      setEditandoEdad(false);
      setEditandoSexo(false);
      setEditandoPeso(false);
      setCambios({});
    };
  
    const modifyUsuario = async (cambios) => {
      const bodyData = {
        nombre_usuario: cambios.nombre_usuario || UsuarioActual.nombre_usuario,
        edad: cambios.edad || UsuarioActual.edad,
        genero: cambios.genero || UsuarioActual.genero,
        peso: cambios.peso || UsuarioActual.peso,
      };
  
      const url = `${API_URL}/usuarios/${IdUsuario}`;
  
      try {
        const usuario_modificado = await axios.patch(url, bodyData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('usuario modificado:', usuario_modificado);
      } catch (error) {
        console.log(error);
      }
    };
  
    return (
        <>
        <div className='perfil-container'>
            <div className='Foto-de-perfil'>
            <h1>Mi Perfil</h1>
                <img src="images/perfil.jpeg" alt="Foto de perfil" />
            </div>

            {UsuarioActual ? (
          <div className='Datos-de-perfil'>
            <div>
              <h2>Nombre:</h2>
              {editandoNombre ? (
                <>
                  <input type="text" value={nuevoNombre} onChange={handleCambioNombre} />
                  <a className='boton-cambio-atributo' onClick={confirmarCambios}>Confirmar</a>
                </>
              ) : (
                <>
                  <p>{UsuarioActual.nombre_usuario}</p>
                  <a className='boton-cambio-atributo' onClick={habilitarEdicionNombre}>Editar</a>
                </>
              )}
            </div>
            <h2>Edad</h2>
            {editandoEdad ? (
              <>
                <input type="text" value={nuevaEdad} onChange={handleCambioEdad} />
                <a className='boton-cambio-atributo' onClick={confirmarCambios}>Confirmar</a>
              </>
            ) : (
              <>
                <p>{UsuarioActual.edad}</p>
                <a className='boton-cambio-atributo' onClick={habilitarEdicionEdad}>Editar</a>
              </>
            )}
            <h2>Género</h2>
            {editandoSexo ? (
              <>
                <select type="text" value={nuevoSexo} onChange={handleCambioSexo}>
                  <option value="Masculino">Masculino</option>
                  <option value="Femenino">Femenino</option>
                  </select> 
                <a className='boton-cambio-atributo' onClick={confirmarCambios}>Confirmar</a>
              </>
            ) : (
              <>
                <p>{UsuarioActual.genero}</p>
                <a className='boton-cambio-atributo' onClick={habilitarEdicionSexo}>Editar</a>
              </>
            )}
            <h2>Peso</h2>
            {editandoPeso ? (
              <>
                <input type="text" value={nuevoPeso} onChange={handleCambioPeso} />
                <a className='boton-cambio-atributo' onClick={confirmarCambios}>Confirmar</a>
              </>
            ) : (
              <>
                <p>{UsuarioActual.peso}</p>
                <a className='boton-cambio-atributo' onClick={habilitarEdicionPeso}>Editar</a>
              </>
            )}
            {/* <p>{UsuarioActual.peso}</p> */}
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
            
            <div><Link to='/crear-rutina'>Modificar rutina</Link></div>
            <div><a href="#división-oculta" onClick={() => { deleteUsuario() }}>Eliminar cuenta</a></div>
            </div>
          )}
        </div>
        </div>


       
        </>
    );  
}

export default Perfil;