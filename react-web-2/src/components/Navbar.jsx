import {React, useContext, useState, useEffect} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';
import logo from '../../public/images/logo_inicio.png';
import { AuthContext } from '../auth/authContext';
import axios from 'axios';



function Navbar() {
  const { token, logout, scope } = useContext(AuthContext);
  const navigate = useNavigate();

  const [IdUsuario, setIdUsuario] = useState(null);
  const [IdPlanner, setIdPlanner] = useState(null);
  const [usuarioActual, setUsuarioActual] = useState(null);

  const [notifications, setNotifications] = useState([]);
  const [notificacionMostrar, setNotificacionMostrar] = useState(null);
  const [notificacionesMostradas, setNotificacionesMostradas] = useState([]);

  // useEffect para obtener el ID del usuario
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
        if (token && IdUsuario){
          console.log('token:', token);
          console.log('IdUsuario:', IdUsuario);
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/usuarios/${IdUsuario}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
          });
        setUsuarioActual(response.data);
        

        console.log('getUser:', response.data);
      }
      } catch (error) {
        console.error(error);
        if (error.response && error.response.status === 404) {
          // User not found, handle accordingly
          console.log('Usuario eliminado');
          // You may want to clear user-related state or perform other actions
          setIdUsuario(null);
          setUsuarioActual(null);
        }
      }
    };

    if (IdUsuario) {
      getUser();
    } else {
      getUserId();
    }
  }, [IdUsuario, token]);

  // useEffect para obtener el ID del planner
  useEffect(() => {
    const getPlanner = async () => {
      try {
        if (token) {
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
      }
      } catch (error) {
        console.error('Hubo un error:', error);
      }
    };
  
    if (IdUsuario) {
      getPlanner();
    }
  }, [IdUsuario, token]);

  // useEffect para obtener las notificaciones
  useEffect(() => {
    const obtenerYCrearNotificaciones = async () => {
      try {
        if (IdPlanner) {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/notificaciones/${IdPlanner}`);
        setNotifications(response.data);
        console.log('notificaciones obtenidas:', response.data.length);
        const fecha = new Date();
        const diaSemana = fecha.getDay();
  
        notifications.forEach((notificacion) => {
        
          if (
            !notificacionesMostradas.includes(notificacion.id) &&
            notificacionMostrar === null &&
            notificacion.tipo &&
            notificacion.contenido
          ) {
            const diaNotificacion = notificacion.tipo.toLowerCase();
            const horaNotificacion = parseInt(notificacion.contenido);
  
            if (
              diaSemana === (['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'].indexOf(diaNotificacion)) &&
              fecha.getHours() === horaNotificacion
            ) {
              // Marcar la notificación como mostrada
              setNotificacionesMostradas((prevNotificacionesMostradas) => [
                ...prevNotificacionesMostradas,
                notificacion.id,
              ]);
              // Mostrar notificación (o realizar la acción que desees)
              setNotificacionMostrar(notificacion);
            }
          }
        });
      }
      } catch (error) {
        console.error(error);
      }
    };

    const intervalId = setInterval(obtenerYCrearNotificaciones, 5000);

    return () => clearInterval(intervalId);
  }, [notifications, notificacionesMostradas, notificacionMostrar, IdPlanner, token]);
  

  useEffect(() => {
    // Aquí puedes agregar la lógica para mostrar tu notificación (puedes reemplazar la alerta)
    if (notificacionMostrar) {
      alert('Notificación: ' + notificacionMostrar.contenido);
      // Limpiar el estado de notificacionMostrar después de mostrar la alerta
      setNotificacionMostrar(null);
    }
  }, [notificacionMostrar]);

  const handleLogout = () => {
    logout() ;
  };

  const handleCrearRutina = (event) => {
    if (token) {
      navigate('/crear-rutina');
    } else {
      alert('Debes iniciar sesión para crear una rutina.');
      event.preventDefault();
      navigate('/ingreso');
    }
  };

  const handleVerPlanner = (event) => {
    if (token) {
      navigate('/planner');
    } else {
      alert('Debes iniciar sesión para ver tu planner.');
      event.preventDefault();
      navigate('/ingreso');
    }
  };

  const handleVerPerfil = (event) => {
    if (token) {
      navigate('/mi-perfil');
    } else {
      alert('Debes iniciar sesión para ver tu planner.');
      event.preventDefault();
      navigate('/ingreso');
    }
  };

  const isAdmin = scope

  return (
    <header>
      <nav className="navbar">
        <div className="logo"> 
        <NavLink exact="true" to="/" activeclassname="active">
        <img src={logo} alt="Logo" className="logo" />
        </NavLink>
        </div>
        <ul>
        <li className="dropdown">
            <span className="dropbtn">Mi perfil</span>
            <div className="dropdown-content">
              <NavLink to="/mi-perfil" activeclassname="active" onClick={handleVerPerfil}>
                Mi Perfil
              </NavLink>
              <NavLink to="/planner" activeclassname="active" onClick={handleVerPlanner}>
                Mi planner
              </NavLink>
              <NavLink to="/crear-rutina" activeclassname="active" onClick={handleCrearRutina}>
                Crear Rutina
              </NavLink>
               {isAdmin == "admin" && (
                <NavLink to="/admin" activeclassname="active">
                  Admin
                </NavLink>
              )} 
            </div>
          </li>          
          <li>
            <NavLink to="/instrucciones" activeclassname="active">
              Instrucciones
            </NavLink>
          </li>
          <li>
            {/* Cambiar entre "Ingresar" y "Cerrar sesión" */}
            {token ? (
              <NavLink to="/" activeclassname="active" onClick={handleLogout}>
                Cerrar Sesión
              </NavLink>
            ) : (
              <NavLink exact="true" to="/ingreso" activeclassname="active">
                Ingresar
              </NavLink>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
