import React from 'react';

import './images.css';

function Image({ src, alt }) {
  return (
    <div className='image-container'> {/* Agrega la clase CSS al contenedor */}
      <img src={src} alt={alt} className='image' /> {/* Agrega la clase CSS a la imagen */}
    </div>
  );
} 

export default Image;