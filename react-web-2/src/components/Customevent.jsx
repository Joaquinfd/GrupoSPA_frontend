import React, { useState } from 'react';
import './Customevent.css';

function CustomEvent({ event }) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <div className={`event ${expanded ? 'expanded' : ''}`} onClick={toggleExpanded}>
      <div>{event.title}</div>
      {expanded && (
        <div>
          {/* Detalles del evento */}
          <p>Fecha: {event.start.toLocaleString()}</p>
          <p>Descripcion:</p>
          <ul>
          {Array.isArray(event.descripcion) && event.descripcion.map((description, index) => (
            <li key={index}>{description}</li>
          ))}
        </ul>
        </div>
      )}
    </div>
  );
}

export default CustomEvent;
