import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import logo from '../../public/images/logo_inicio.png';

function Navbar() {
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
              <NavLink to="/mi-perfil" activeclassname="active">
                Mi Perfil
              </NavLink>
              <NavLink to="/planner" activeclassname="active">
                Mi planner
              </NavLink>
              <NavLink to="/crear-rutina" activeclassname="active">
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
          <NavLink exact="true" to="/ingreso" activeclassname="active">
            Ingresar
          </NavLink>
        </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
