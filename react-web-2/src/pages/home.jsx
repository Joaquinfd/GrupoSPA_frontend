import React, { useState } from 'react';
import './home.css'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';


export default function Home() {

    // const images = ["images/home-image-1.jpg", 
    // "images/home-image-2.jpg", "images/home-image-3.jpg"];

    const images = [
        {
            url: "images/home-image-1.jpg",
            text: "Texto para la imagen 1",
        },
        {
            url: "images/home-image-2.jpg",
            text: "Texto para la imagen 2",
        },
        {
            url: "images/home-image-3.jpg",
            text: "Texto para la imagen 3",
        },
    ];

    return (
        <div className="home-main-container" id='home-div-hmc'>
            <div className="home-container" id='home-div-hc'>
                <h1>Mensaje bienvenida</h1>
                <div className="presentation-container" id='home-div-pc'>
                    <Carousel useKeyboardArrows={false} className='carousel' id='home-carousel'>
                        {images.map((imageData, index) => (
                        <div className="slide" key={index}>
                            <img alt="image-container" src={imageData.url} />
                            {/* siguiente div con gpt */}
                            <div className="image-text">{imageData.text}</div>
                        </div>
                        ))}
                        {/* src: https://cloudinary.com/blog/add-a-responsive-image-carousel-to-your-react-app */}
                    </Carousel>
                    <Link to="/ingreso">
                        <button className='boton-registro' id='home-button-br'>
                            <h2>Inicia sesión / Registrate</h2>
                        </button>
                    </Link>
                    
                </div>
            </div>
        </div>
    );
}