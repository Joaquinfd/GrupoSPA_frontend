import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import logo from '../../public/images/logo_inicio.png';

function Navbar() {
  return (
    <header>
      <nav className="navbar">
        <div className="logo"> 
        <NavLink exact to="/" activeClassName="active">
        <img src={logo} alt="Logo" className="logo" />
        </NavLink>
        </div>
        <ul>
        <li className="dropdown">
            <span className="dropbtn">Mi perfil</span>
            <div className="dropdown-content">
              <NavLink to="/mi-perfil" activeClassName="active">
                Mi Perfil
              </NavLink>
              <NavLink to="/planner" activeClassName="active">
                Mi planner
              </NavLink>
              <NavLink to="/crear-rutina" activeClassName="active">
                Crear Rutina
              </NavLink>
            </div>
          </li>          
          <li>
            <NavLink to="/instrucciones" activeClassName="active">
              Instrucciones
            </NavLink>
          </li>
          <li>
          <NavLink exact to="/ingreso" activeClassName="active">
            Ingresar
          </NavLink>
        </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
