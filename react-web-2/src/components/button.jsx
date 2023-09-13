import React from 'react';

import './button.css'

function Button({ onClick, label, isSelected  }) {

  const buttonClassName = isSelected ? 'button selected-button' : 'button';

  return (
    <button onClick={onClick} className= {buttonClassName}>
        {label}
    </button>
  );
}

export default Button;