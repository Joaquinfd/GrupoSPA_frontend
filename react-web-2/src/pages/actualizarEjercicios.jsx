import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Typography,
  Container,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import './agregarEjercicios.css';
import API_URL from '../config';

function ActualizarEjercicio() {
  const navigate = useNavigate();
  const [ejercicioIdToUpdate, setEjercicioIdToUpdate] = useState('');
  const [nombre, setNombre] = useState('');
  const [dificultad, setDificultad] = useState('');
  const [grupoMuscular, setGrupoMuscular] = useState('');
  const [idRutina, setIdRutina] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [updateMessage, setUpdateMessage] = useState(null);

  const handleUpdateEjercicio = async () => {
    try {
      const response = await axios.patch(`${API_URL}/ejercicios/${ejercicioIdToUpdate}`, {
        nombre_ejercicio: nombre,
        dificultad,
        grupo_muscular: grupoMuscular,
        id_rutina: idRutina,
        descripcion,
      });

      console.log('Ejercicio actualizado:', response.data);
      setUpdateMessage({ type: 'success', text: 'Ejercicio actualizado exitosamente' });
    } catch (error) {
      console.error('Error al actualizar el ejercicio:', error);
      setUpdateMessage({ type: 'error', text: 'Error al actualizar el ejercicio' });
    }
  };

  return (
    <Container maxWidth="sm" className="ejercicios-container">
      <Typography variant="h4" component="h2" gutterBottom>
        Actualizar Ejercicio
      </Typography>
      {updateMessage && (
        <Typography color={updateMessage.type === 'success' ? 'success' : 'error'}>
          {updateMessage.text}
        </Typography>
      )}
      <form>
        <TextField
          label="ID del ejercicio a actualizar"
          variant="outlined"
          fullWidth
          margin="normal"
          type="number"
          value={ejercicioIdToUpdate}
          onChange={(e) => setEjercicioIdToUpdate(e.target.value)}
        />
        <TextField
          label="Nuevo nombre del ejercicio"
          variant="outlined"
          fullWidth
          margin="normal"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Nueva Dificultad</InputLabel>
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
          label="Nuevo Grupo Muscular"
          variant="outlined"
          fullWidth
          margin="normal"
          value={grupoMuscular}
          onChange={(e) => setGrupoMuscular(e.target.value)}
        />
        <TextField
          label="Nuevo ID de la Rutina"
          variant="outlined"
          fullWidth
          margin="normal"
          type="number"
          value={idRutina}
          onChange={(e) => setIdRutina(e.target.value)}
        />
        <TextField
          label="Nueva Descripción del ejercicio"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          margin="normal"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
        <Button
          className="actualizar-ejercicio-btn"
          variant="contained"
          color="primary"
          onClick={handleUpdateEjercicio}
        >
          Actualizar Ejercicio
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

export default ActualizarEjercicio;
