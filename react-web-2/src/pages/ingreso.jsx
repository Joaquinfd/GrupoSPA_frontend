import React, { useState, useContext } from 'react';
import './ingreso.css';
import { BrowserRouter as Router, Route, Link, useNavigate  } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../auth/authContext';


function Ingreso() {
    const {token, setToken} = useContext(AuthContext)
    const navigate = useNavigate();

    const [showRegister, setShowRegister] = useState(false);

    const [inputEmail, setInputEmail] = useState(''); 
    const [inputName, setInputName] = useState('');
    const [inputPassword, setInputPassword] = useState('');
    const [inputAge, setInputAge] = useState('');
    const [inputWeight, setInputWeight] = useState('');
    const [inputGender, setInputGender] = useState('masculino');

    const [inputObjetivo, setInputObjetivo] = useState('bajar_peso');
    const [inputDificultad, setInputDificultad] = useState('');
    const handleSignUpClick = () => {
        setShowRegister(!showRegister);
        setInputEmail('');
        setInputPassword('');
        setInputName('');
        setInputAge('');
        setInputWeight('');
        setInputGender('masculino');
        setInputObjetivo('bajar_peso');
        setInputDificultad('');
    };

    const handleLoginSubmit = async (event) => {
        event.preventDefault();
        console.log('Iniciar Sesión:', inputEmail, inputPassword);

        const loginData = {
            mail: inputEmail,
            contraseña: inputPassword
          };
        try {
            const respuesta = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/usuarios/login`, loginData);


            // Se guarda el token en localStorage
            const access_token = respuesta.data.access_token;
            setToken(access_token); 
            console.log(access_token);
            navigate('/mi-perfil');

            
            
        }
        catch(error){
            console.error('Error en el inicio de sesión:', error);
            if (error.response) {
                if (error.response.status === 400) {
                  alert('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
                } else {
                  console.error('Error en el servidor:', error.response.data);
                }
            }
        }
    };

    const handleRegisterSubmit = async (event) => {
        event.preventDefault();
        console.log('Registrarse:', inputEmail, inputPassword, inputName, inputAge, inputWeight, inputGender, inputObjetivo);
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
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/usuarios/signup`, bodyParameters);
            console.log(response.data); 
            console.log('Usuario creado: ', bodyParameters);
            const access_token = response.data.access_token;
            setToken(access_token);
            
            await handleLoginSubmit(event);
            alert('¡Registro exitoso!');
        } catch (error) {
            console.error("Error en la solicitud:", error);
            if (error.response) {
                if (error.response.data.errors && Array.isArray(error.response.data.errors)) {
                    const validationErrors = error.response.data.errors.map((err) => err.message);
                    alert(validationErrors.join('\n'));
                } else {
                    alert('Error en el servidor. Por favor, inténtalo de nuevo.');
                }
            } else {
                alert('Error en la solicitud. Por favor, inténtalo de nuevo.');
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
                                <label htmlFor="username">Mail:</label>
                                <input 
                                    type="text" 
                                    placeholder='tumail@plannerSPA.com' 
                                    className='ingreso-username'
                                    value={inputEmail}
                                    onChange={(e) => setInputEmail(e.target.value)}
                                    autoComplete="username"
                                    required
                                />
                            </div>
                            <div className='form-element'>
                                <label htmlFor="password">Contraseña:</label>
                                <input 
                                    type="password" 
                                    placeholder='contraseña'
                                    className='ingreso-password'
                                    autoComplete="current-password"
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
                            {showRegister && (
                            <div className='form-element'>
                                <label htmlFor="objetivo">Objetivo:</label>
                                <select 
                                id="objetivo" 
                                name="objetivo" 
                                className='ingreso-objetivo'
                                value={inputObjetivo}
                                onChange={(e) => setInputObjetivo(e.target.value)}
                                >
                                <option value="bajar_peso">Bajar de peso</option>
                                <option value="ganar_masa_muscular">Ganancia de Masa Muscular</option>
                                <option value="definicion">Definición</option>
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