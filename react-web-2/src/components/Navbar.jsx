import {React, useContext, useEffect, useState} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';
import logo from '../../public/images/logo_inicio.png';
import { AuthContext } from '../auth/authContext';
import axios from 'axios';
import { da } from 'date-fns/locale';
import { set } from 'date-fns';
// import io from 'socket.io-client';

// const socket = io('http://localhost:3001')


function Navbar() {


  const [notifications, setNotifications] = useState([]);
  const [notificacionMostrar, setNotificacionMostrar] = useState(null);
  const [notificacionesMostradas, setNotificacionesMostradas] = useState([]);

  useEffect(() => {
    const obtenerYCrearNotificaciones = async () => {
      try {
        const response = await axios.get('http://localhost:3000/notificaciones');
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
      } catch (error) {
        console.error(error);
      }
    };

    const intervalId = setInterval(obtenerYCrearNotificaciones, 5000);

    return () => clearInterval(intervalId);
  }, [notifications, notificacionesMostradas, notificacionMostrar]);
  

  useEffect(() => {
    // Aquí puedes agregar la lógica para mostrar tu notificación (puedes reemplazar la alerta)
    if (notificacionMostrar) {
      alert('Notificación: ' + notificacionMostrar.contenido);
      // Limpiar el estado de notificacionMostrar después de mostrar la alerta
      setNotificacionMostrar(null);
    }
  }, [notificacionMostrar]);


  const { token, logout, scope } = useContext(AuthContext);

  const navigate = useNavigate();

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


  const handleToggleNotifications = () => {
    setShowNotifications((prev) => !prev);
    setUnreadCount(0);
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
        {/* <div>
          <h1>Notificaciones</h1>
          <ul>
            {notifications.map((notificacion, index) => (
              <li key={index}>{notificacion.contenido}</li>
            ))}
          </ul>
        </div> */}
        {/* <div className="notification-container">
          <span className="notification-icon" onClick={handleToggleNotifications}>
            📣
            {unreadCount > 0 && <span className="unread-count">{unreadCount}</span>}
          </span>
          {showNotifications && (
            <div className="notification-list">
              {notifications.map((notification, index) => (
                <div key={index} className="notification-item">
                  {notification.content}
                </div>
              ))}
            </div>
          )}
        </div>  */}
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
