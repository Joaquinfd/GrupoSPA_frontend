import React, { useState } from 'react';
import './ingreso.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import axios from 'axios';


function Ingreso() {

    
    const [showRegister, setShowRegister] = useState(false);

    const [inputEmail, setInputEmail] = useState(''); 
    const [inputName, setInputName] = useState('');
    const [inputPassword, setInputPassword] = useState('');
    const [inputAge, setInputAge] = useState('');
    const [inputWeight, setInputWeight] = useState('');
    const [inputGender, setInputGender] = useState('masculino');

    const [inputObjetivo, setInputObjetivo] = useState('');
    const [inputDificultad, setInputDificultad] = useState('');



    //ejemplo de patch

    // const patchUsuario = async (userId, dataToUpdate) => {
    //     const url = `http://localhost:3000/usuarios/update/${userId}`;
      
    //     try {
    //       const response = await axios.patch(url, dataToUpdate);
    //       // En Axios, simplemente pasas la URL y los datos a enviar para la solicitud PATCH
      
    //       console.log('Usuario actualizado:', response.data);
    //       // Aquí podrías manejar la respuesta como necesites
    //     } catch (error) {
    //       console.error('Hubo un problema al intentar actualizar el usuario:', error);
    //       // Aquí podrías manejar el error de manera adecuada en tu aplicación
    //     }
    //   };
      
    //   // Llamada a la función para actualizar un usuario específico
    //   const userId = 1; // ID del usuario que quieres actualizar
    //   const dataToUpdate = {
    //     peso: 80,
    //   };
      
    // patchUsuario(userId, dataToUpdate);


    const handleSignUpClick = () => {
        setShowRegister(!showRegister);
        setInputEmail('');
        setInputPassword('');
        setInputName('');
        setInputAge('');
        setInputWeight('');
        setInputGender('masculino');
        setInputObjetivo('');
        setInputDificultad('');
    };

    const handleLoginSubmit = async (event) => {
        event.preventDefault();
        // Lógica de inicio de sesión con get al servidor, se hace get general, debe hacer get al usuario
        // indicar el enlace necesario para eso.
        console.log('Iniciar Sesión:', inputEmail, inputPassword);

        axios.get('http://localhost:3000/usuarios/list')
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error(error);
        });
    };

    const handleRegisterSubmit = async (event) => {
        event.preventDefault();
        // Lógica de registro con post al servidor
        console.log('Registrarse:', inputEmail, inputPassword, inputName, inputAge, inputWeight, inputGender);

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
            console.log(response.data); 
            console.log('Usuario creado: ', bodyParameters);
        } catch (error) {
            console.error("Error en la solicitud:", error);
            if (error.response) {
                console.error("Respuesta del servidor:", error.response.data);
            }
        }
    };

    

    return (


        <div className='ingreso-main-container'>
                    <div className='ingreso-form-container'>
                        <h1>{showRegister ? 'Regístrate' : 'Inicia sesión'}</h1>
                        <form onSubmit={showRegister ? handleRegisterSubmit : handleLoginSubmit} className='ingreso-form'>
                            <div className='form-element'>
                                <label htmlFor="username">Usuario:</label>
                                <input 
                                    type="text" 
                                    placeholder='tumail@plannerSPA.com' 
                                    className='ingreso-username'
                                    value={inputEmail}
                                    onChange={(e) => setInputEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className='form-element'>
                                <label htmlFor="password">Contraseña:</label>
                                <input 
                                    type="password" 
                                    placeholder='contraseña'
                                    className='ingreso-password'
                                    value={inputPassword}
                                    onChange={(e) => setInputPassword(e.target.value)}
                                    required
                                />
                            </div>
                            {showRegister && (
                                <div className='form-element'>
                                    <label htmlFor="nombre">Nombre:</label>
                                    <input 
                                        type="text" 
                                        id="nombre" 
                                        name="name" 
                                        className='ingreso-nombre'
                                        value={inputName}
                                        onChange={(e) => setInputName(e.target.value)}
                                    />
                                </div>
                            )}
                            {showRegister && (
                                <div className='form-element'>
                                    <label htmlFor="age">Edad:</label>
                                    <input 
                                        type="number" 
                                        id="age" 
                                        name="age" 
                                        className='ingreso-edad'
                                        value={inputAge}
                                        onChange={(e) => setInputAge(e.target.value)}
                                    />
                                </div>
                            )}
                            {showRegister && (
                                <div className='form-element'>
                                    <label htmlFor="weight">Peso (Kg):</label>
                                    <input 
                                        type="number" 
                                        id="weight" 
                                        name="weight" 
                                        className='ingreso-peso'
                                        value={inputWeight}
                                        onChange={(e) => setInputWeight(e.target.value)}
                                    />
                                </div>
                            )}
                            {showRegister && (
                                <div className='form-element'>
                                    <label htmlFor="gender">Género:</label>
                                    <select 
                                        id="gender" 
                                        name="gender" 
                                        className='ingreso-sexo'
                                        value={inputGender}
                                        onChange={(e) => setInputGender(e.target.value)}
                                    >
                                        <option value="masculino">Masculino</option>
                                        <option value="femenino">Femenino</option>
                                    </select>
                                </div>
                            )}
                            <button type='submit' className='ingreso-submit-form'>
                                {showRegister ? 'Registrarse' : 'Entrar'}
                            </button>
                            <button type='button' onClick={handleSignUpClick} className='ingreso-boton-registro'>
                                {showRegister ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate'}
                            </button>
                        </form>
                    </div>
                </div>
            );  
        }

export default Ingreso;