import React, { useState } from 'react';

//hecho con chatgpt
function GenderSelection({ onGenderSelect }) {
  const [selectedGender, setSelectedGender] = useState(null);

  const handleGenderSelect = (gender) => {
    setSelectedGender(gender);
    onGenderSelect(gender);
  };

  return (
    <div>
      <h2>Selecciona tu género:</h2>
      <button onClick={() => handleGenderSelect('Hombre')}>Hombre</button>
      <button onClick={() => handleGenderSelect('Mujer')}>Mujer</button>
    </div>
  );
}

export default GenderSelection;