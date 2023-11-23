import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  TextField,
  Button,
  Typography,
  Container,
} from '@mui/material';

function Ejercicios() {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('');
  const [dificultad, setDificultad] = useState('');
  const [grupoMuscular, setGrupoMuscular] = useState('');
  const [idRutina, setIdRutina] = useState(1);
  const [descripcion, setDescripcion] = useState('');

  const handleCreateEjercicio = async () => {
    try {
      const response = await axios.post('/api/ejercicios', {
        nombre_ejercicio: nombre,
        dificultad,
        grupo_muscular: grupoMuscular,
        id_rutina: idRutina,
        descripcion,
      });

      console.log('Ejercicio creado:', response.data);
      navigate('/ruta_despues_de_crear_ejercicio');
    } catch (error) {
      console.error('Error al crear el ejercicio:', error);
    }
  };

  return (
    <Container
      maxWidth="sm"
      className="ingreso-form-container"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '70%',
        height: 'auto',

        marginTop: '50px',

      }}
    >
      <Typography variant="h4" component="h2" gutterBottom>
        Crear Nuevo Ejercicio
      </Typography>
      <form className="ingreso-form">
        <TextField
          label="Nombre del ejercicio"
          variant="outlined"
          fullWidth
          margin="normal"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <TextField
          label="Dificultad"
          variant="outlined"
          fullWidth
          margin="normal"
          value={dificultad}
          onChange={(e) => setDificultad(e.target.value)}
        />
        <TextField
          label="Grupo Muscular"
          variant="outlined"
          fullWidth
          margin="normal"
          value={grupoMuscular}
          onChange={(e) => setGrupoMuscular(e.target.value)}
        />
        <TextField
          label="ID de la Rutina"
          variant="outlined"
          fullWidth
          margin="normal"
          type="number"
          value={idRutina}
          onChange={(e) => setIdRutina(e.target.value)}
        />
        <TextField
          label="Descripción del ejercicio"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          margin="normal"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          className="ingreso-submit-form"
          onClick={handleCreateEjercicio}
        >
          Crear Ejercicio
        </Button>
      </form>
      <Link to="/" className="link-mi-perfil">
        Volver
      </Link>
    </Container>
  );
}

export default Ejercicios;
