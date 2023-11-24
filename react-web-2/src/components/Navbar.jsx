import {React, useContext, useEffect, useState} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';
import logo from '../../public/images/logo_inicio.png';
import { AuthContext } from '../auth/authContext';
import io from 'socket.io-client';

const socket = io('http://localhost:3001')


function Navbar() {

  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    // Configuración de los listeners de Socket.io

    // Listener para el evento 'nuevaNotificacion'
    socket.on('nuevaNotificacion', (data) => {
      // Aquí puedes actualizar el estado o realizar acciones según la nueva notificación
      console.log('Nueva notificacion recibida:', data)
      setNotifications((prevNotifications) => [...prevNotifications, data]);
      setUnreadCount((prevCount) => prevCount + 1);
    });

    // Importante: Desconectar el socket cuando el componente se desmonta
    return () => {
      // Desconectar el socket pasado 10 segundos
      setTimeout(() => {
        socket.disconnect();
      }, 5000);
      // socket.disconnect();
    };
  }, []); // El [] asegura que el efecto se ejecute solo una vez al montar el componente

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
        <div className="notification-container">
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
