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

//   const [notifications, setNotifications] = useState([]);
//   const [unreadCount, setUnreadCount] = useState(0);
//   const [showNotifications, setShowNotifications] = useState(false);
//   const [notificacionMostrar, setNotificacionMostrar] = useState([]);
//   const [notificacionesMostradas, setNotificacionesMostradas] = useState(false);

//   const diasSemana = {
//     'lunes': 1,
//     'martes': 2,
//     'miercoles': 3,
//     'jueves': 4,
//     'viernes': 5,
//     'sabado': 6,
//     'domingo': 0
//   }

//   useEffect(() => {

//     const obtenerNotificaciones = async () => {
//       try {
//         const response = await axios.get('http://localhost:3000/notificaciones');
//         setNotifications(response.data);
//         console.log(response.data);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     const intervalId = setInterval(obtenerNotificaciones, 10000);

//     return () => clearInterval(intervalId);
//   }, []);



//   useEffect(() => {
//     // mapear dias de la semana a numeros del 0 al 6
    
//     const fecha = new Date();
//     const diaSemana = fecha.getDay();

//     const crearNotificacion = async () => {
//     notifications.forEach((notificacion) => {
//       // revisar si el dia de semana corresponde al dia de semana actual
//       if (diasSemana[notificacion.tipo] === diaSemana) {

//         console.log('notificacion dia actual:', notificacion)
//         const hora_actual = new Date().getHours();
//         console.log('hora actual:', hora_actual)
//         // mostrar notificacion si la hora actual es igual a la hora de la notificacion
//         if (hora_actual === parseInt(notificacion.contenido) && !notificacionesMostradas) {
//           // crear notificacion
//           console.log('se creo notificacion')
//           // mostrar notificacion
//           setNotificacionMostrar([notificacion]);
//           alert('Notificacion');
//           setNotificacionesMostradas(true);
//         }
//       }
  
//     });
//   };
//   const intervalId = setInterval(crearNotificacion, 5000);

//   return () => clearInterval(intervalId);

// }, [notifications]);
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





  // useEffect(() => {
  //   // Configuración de los listeners de Socket.io

  //   // Listener para el evento 'nuevaNotificacion'
  //   socket.on('nuevaNotificacion', (data) => {
  //     // Aquí puedes actualizar el estado o realizar acciones según la nueva notificación
  //     console.log('Nueva notificacion recibida:', data)
  //     setNotifications((prevNotifications) => [...prevNotifications, data]);
  //     setUnreadCount((prevCount) => prevCount + 1);
  //     console.log('notificaciones sin leer:', unreadCount)
  //   });

  //   // Importante: Desconectar el socket cuando el componente se desmonta
  //   return () => {
  //     // Desconectar el socket pasado 10 segundos
  //     setTimeout(() => {
  //       socket.disconnect();
  //     }, 5000);
  //     // socket.disconnect();
  //   };
  // }, []); // El [] asegura que el efecto se ejecute solo una vez al montar el componente

  const { token, logout } = useContext(AuthContext);
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
