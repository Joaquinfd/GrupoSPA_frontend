import React, { useState } from 'react';
import './home.css'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import axios from 'axios';  

export default function Home() {


    
    axios.get('http://localhost:3000/usuarios/list')
    .then(response => {
        // Procesar los datos recibidos desde el backend
        console.log(response.data);
    })
    .catch(error => {
        // Manejar errores de la solicitud
        console.error(error);
    });

    // axios.post('http://localhost:3000/characters/create', {
    //     name: 'Jesse',
    //     description: 'Mechanic',
    //     image: 'https://vignette.wikia.nocookie.net/breakingbad/images/0/0e/JesseS5.jpg/revision/latest?cb=20120620014053'
    // })


    const images = [
        {
            url: "images/home-image-1.jpg",
            text: "Si no lo intentas, nunca sabrás de lo que eres capaz",
        },
        {
            url: "images/home-image-2.jpg",
            text: "No pain, no gain ¡A entrenar!",
        },
        {
            url: "images/mujer_corredora_home.jpg",
            text: "Tu cuerpo es tu mejor inversión",
        },        
        {
            url: "images/home-image-3.jpg",
            text: "Se fuerte como acero",
        },

    ];

    return (
        <div className="home-main-container" id='home-div-hmc'>
            <div className="home-container" id='home-div-hc'>
                <h1>"¡Prepárate para desafiar tus límites!"</h1>
                <div className="presentation-container" id='home-div-pc'>

                <Carousel useKeyboardArrows={false} infiniteLoop={true} showThumbs={false} className='carousel' id='home-carousel' autoPlay={true} interval={5000}>
                        {images.map((imageData, index) => (
                        <div className="slide" key={index}>
                            <img alt="image-container" src={imageData.url} />
                            {/* siguiente div con gpt */}
                            <div className="image-text">{imageData.text}
                            </div>
                        </div>
                        ))}
                        {/* src: https://cloudinary.com/blog/add-a-responsive-image-carousel-to-your-react-app */}
                    </Carousel>
                    <Link to="/crear-rutina">
                        <button className='boton-registro' id='home-button-br'>
                            <h2>Empieza ahora!</h2>
                        </button>
                    </Link>
                    
                </div>
            </div>
        </div>
    );
}