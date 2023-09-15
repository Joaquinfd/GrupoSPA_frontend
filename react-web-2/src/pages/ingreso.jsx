import React, { useState } from 'react';
import './ingreso.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';


function Ingreso() {

    const [showAdditionalInputs, setShowAdditionalInputs] = useState(false);
    const [buttonText, setButtonText] = useState('No tienes sesión? Registrate');

    const handleSignUpClick = () => {
    setShowAdditionalInputs(!showAdditionalInputs);
    setButtonText(showAdditionalInputs ? 'Registrarse' : 'Tienes cuenta? Inicia sesión');
    };

    return (

        <div className='ingreso-main-container'>
            <div className='ingreso-form-container'>
                <h1>Inicia sesión</h1>
                <form action="input" className='ingreso-form'>
                    <div className='form-element'>
                        <label htmlFor="username">Usuario:</label>
                        <input type="text" placeholder='nombre' className='ingreso-username'/>
                    </div>
                    <div className='form-element'>
                        <label htmlFor="password">Contraseña:</label>
                        <input type="password" placeholder='contraseña' className='ingreso-password'/>
                    </div>
                    {showAdditionalInputs && (
                    <div className='form-element'>
                        <label htmlFor="age">Edad:</label>
                        <input type="number" id="age" name="age" className='ingreso-edad'/>
                    </div>
                    )}
                    {showAdditionalInputs && (
                    <div className='form-element'>
                        <label htmlFor="weight">Peso (Kg):</label>
                        <input type="number" id="weight" name="weight" className='ingreso-peso'/>
                    </div>
                    )}
                    {showAdditionalInputs && (
                    <div className='form-element'>
                        <label htmlFor="gender">Género:</label>
                        <select id="gender" name="gender" className='ingreso-sexo'>
                        <option value="masculino">Masculino</option>
                        <option value="femenino">Femenino</option>
                        </select>
                    </div>
                    )}
                    <button type='button' onClick={handleSignUpClick} className='ingreso-boton-registro'>
                        {buttonText}
                    </button>
                    
                </form>
                
            </div>
        </div>

    );  
}

export default Ingreso;