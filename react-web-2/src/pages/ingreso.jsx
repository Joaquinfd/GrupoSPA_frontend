import React, { useState } from 'react';
import './ingreso.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import axios from 'axios';


function Ingreso() {

    const [showAdditionalInputs, setShowAdditionalInputs] = useState(false);
    const [buttonText, setButtonText] = useState('No tienes sesión? Registrate');

    const [inputEmail, setInputEmail] = useState(''); 
    const [inputName, setInputName] = useState('');
    const [inputPassword, setInputPassword] = useState('');
    const [inputAge, setInputAge] = useState('');
    const [inputWeight, setInputWeight] = useState('');
    const [inputGender, setInputGender] = useState('');

    const [inputObjetivo, setInputObjetivo] = useState('');
    const [inputDificultad, setInputDificultad] = useState('');


    const handleSignUpClick = () => {
    setShowAdditionalInputs(!showAdditionalInputs);
    setButtonText(showAdditionalInputs ? 'No tienes cuenta? Registrate' : 'Tienes cuenta? Inicia sesión');
    };

    


    const handleClickPost = async (event) => {
        event.preventDefault();

        
        const bodyParameters = {
            nombre_usuario: inputName,
            objetivo: inputObjetivo,
            edad: parseInt(inputAge),
            peso: parseInt(inputWeight),
            genero: inputGender,
            mail: inputEmail,
            contraseña: inputPassword
        };
        
        
        try {
            const response = await axios.post('http://localhost:3000/usuarios/create', bodyParameters);
            console.log(response.data); // Puedes acceder a la respuesta exitosa aquí
            console.log('Usuario creado: ', bodyParameters);
        } catch (error) {
            console.error("Error en la solicitud:", error);
            if (error.response) {
                console.error("Respuesta del servidor:", error.response.data);
            }
        }
    }        

    

    return (

        <div className='ingreso-main-container'>
            <div className='ingreso-form-container'>
                <h1>Inicia sesión</h1>
                <form onSubmit={handleClickPost} className='ingreso-form'>
                    <div className='form-element'>
                        <label htmlFor="username">Usuario:</label>
                        <input 
                        type="text" 
                        placeholder='tumail@plannerSPA.com' 
                        className='ingreso-username'
                        value={inputEmail}
                        onChange={(e) => setInputEmail(e.target.value)}
                        required/>
                    </div>
                    <div className='form-element'>
                        <label htmlFor="password">Contraseña:</label>
                        <input 
                        type="password" 
                        placeholder='contraseña'
                        className='ingreso-password'
                        value={inputPassword}
                        onChange={(e) => setInputPassword(e.target.value)}
                        required/>
                    </div>
                    {showAdditionalInputs && (
                    <div className='form-element'>
                        <label htmlFor="nombre">Nombre:</label>
                        <input 
                        type="text" 
                        id="nombre" 
                        name="name" 
                        className='ingreso-nombre'
                        value={inputName}
                        onChange={(e) => setInputName(e.target.value)}/>
                    </div>
                    )}
                    {showAdditionalInputs && (
                    <div className='form-element'>
                        <label htmlFor="age">Edad:</label>
                        <input 
                        type="number" 
                        id="age" 
                        name="age" 
                        className='ingreso-edad'
                        value={inputAge}
                        onChange={(e) => setInputAge(e.target.value)}/>
                    </div>
                    )}
                    {showAdditionalInputs && (
                    <div className='form-element'>
                        <label htmlFor="weight">Peso (Kg):</label>
                        <input 
                        type="number" 
                        id="weight" 
                        name="weight" 
                        className='ingreso-peso'
                        value={inputWeight}
                        onChange={(e) => setInputWeight(e.target.value)}/>
                    </div>
                    )}
                    {showAdditionalInputs && (
                    <div className='form-element'>
                        <label htmlFor="gender">Género:</label>
                        <select 
                        id="gender" 
                        name="gender" 
                        className='ingreso-sexo'
                        value={inputGender}
                        onChange={(e) => setInputGender(e.target.value)}>
                        <option value="masculino">Masculino</option>
                        <option value="femenino">Femenino</option>
                        </select>
                    </div>
                    )}
                    <button type='submit' className='ingreso-submit-form'>Entrar</button>
                    <button type='button' onClick={handleSignUpClick} className='ingreso-boton-registro'>
                        {buttonText}
                    </button>
                    
                </form>
                
            </div>
        </div>

    );  
}

export default Ingreso;