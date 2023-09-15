import React, { useState } from 'react';
'./CampoEditable.css'
function CampoEditable({ valorInicial }) {
  const [valor, setValor] = useState(valorInicial);
  const [editando, setEditando] = useState(false);

  const handleEditarClick = () => {
    setEditando(true);
  };

  const handleGuardarClick = () => {
    // Aquí puedes agregar lógica para guardar el nuevo valor, por ejemplo, enviarlo al servidor.
    // En este ejemplo, simplemente actualizamos el estado local.
    setEditando(false);
  };

  return (
    <div>
      {editando ? (
        <div>
          <input
            type="text"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
          />
          <button onClick={handleGuardarClick}>Guardar</button>
        </div>
      ) : (
        <div>
          {valor}
          <button onClick={handleEditarClick}>Editar</button>
        </div>
      )}
    </div>
  );
}

export default CampoEditable;