import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  TextField,
  Button,
  Typography,
  Container,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import './agregarEjercicios.css';
import API_URL from '../config';

function CrearEjercicios() {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('');
  const [dificultad, setDificultad] = useState('');
  const [grupoMuscular, setGrupoMuscular] = useState('');
  const [idRutina, setIdRutina] = useState(1);
  const [descripcion, setDescripcion] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [newExercise, setNewExercise] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleCreateEjercicio = async () => {
    if (!nombre || !dificultad || !grupoMuscular || !idRutina || !descripcion) {
      setErrorMessage('Por favor, complete todos los campos.');
      return;
    }
    try {
      const response = await axios.post(`${API_URL}/ejercicios`, {
        nombre_ejercicio: nombre,
        dificultad,
        grupo_muscular: grupoMuscular,
        id_rutina: idRutina,
        descripcion,
      });


      console.log('Ejercicio creado:', response.data);
      setNewExercise(response.data); // Guarda el nuevo ejercicio
      setSuccessMessage('Ejercicio creado exitosamente');
      setErrorMessage('');
    } catch (error) {
      console.error('Error al crear el ejercicio:', error);
      setSuccessMessage(''); // Limpiar el mensaje de éxito si hay un error
      setErrorMessage('Error al crear el ejercicio');
    }
  };

  return (
    <Container maxWidth="sm" className="ejercicios-container">
      <Typography variant="h4" component="h2" gutterBottom>
        Crear Nuevo Ejercicio
      </Typography>
      {successMessage && <Typography color="success">{successMessage}</Typography>}
      {errorMessage && <Typography color="error">{errorMessage}</Typography>}

      {newExercise && (
        <div>
          <Typography variant="h6">Ejercicio Creado:</Typography>
          <pre>{JSON.stringify(newExercise, null, 2)}</pre>
        </div>
      )}
      <form>
        <TextField
          label="Nombre del ejercicio"
          variant="outlined"
          fullWidth
          margin="normal"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Dificultad</InputLabel>
          <Select
            value={dificultad}
            onChange={(e) => setDificultad(e.target.value)}
            label="Dificultad"
          >
            <MenuItem value="Baja">Baja</MenuItem>
            <MenuItem value="Media">Media</MenuItem>
            <MenuItem value="Alta">Alta</MenuItem>
          </Select>
        </FormControl>
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
          className="crear-ejercicio-btn"
          variant="contained"
          color="primary"
          onClick={handleCreateEjercicio}
        >
          Crear Ejercicio
        </Button>
      </form>
      <Button
        className="volver-link"
        variant="contained"
        color="secondary"
        style={{ marginTop: '10px' }}
        onClick={() => navigate('/admin')}
      >
        Volver
      </Button>
    </Container>
  );
}

export default CrearEjercicios;
