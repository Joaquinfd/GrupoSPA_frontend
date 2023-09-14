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
          <p>Ejercicios:</p>
          <ul>
            {event.ejercicios.map((exercise, index) => (
              <li key={index}>{exercise}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default CustomEvent;
