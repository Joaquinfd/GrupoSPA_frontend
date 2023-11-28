import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Typography,
  Container,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import './agregarEjercicios.css';

//Hecho con ChatGPT
function EliminarEjercicios() {
  const navigate = useNavigate();
  const [ejercicioIdToDelete, setEjercicioIdToDelete] = useState('');
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState({ type: '', content: '' });

  const handleOpenDeleteConfirmation = () => {
    setDeleteConfirmationOpen(true);
  };

  const handleCloseDeleteConfirmation = () => {
    setDeleteConfirmationOpen(false);
  };

  const handleDeleteEjercicio = async () => {
    if (!ejercicioIdToDelete) {
      setDeleteMessage({ type: 'error', content: 'Por favor, ingresa el ID del ejercicio a eliminar.' });
      return;
    }
    try {
      const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/ejercicios/${ejercicioIdToDelete}`);
      setDeleteMessage({ type: 'success', content: 'Ejercicio eliminado exitosamente' });
      handleCloseDeleteConfirmation();
      console.log('Ejercicio eliminado:', response.data);
    } catch (error) {
      setDeleteMessage({ type: 'error', content: 'Error al eliminar el ejercicio. Verifique que el ID sea válido' });
      console.error('Error al eliminar el ejercicio:', error);
    }
  };

  const resetDeleteMessage = () => {
    setDeleteMessage({ type: '', content: '' });
  };

  return (
    <Container maxWidth="sm" className="ejercicios-container">
      <Typography variant="h4" component="h2" gutterBottom>
        Eliminar Ejercicio
      </Typography>
      {deleteMessage.type === 'success' && <Typography color="success">{deleteMessage.content}</Typography>}
      {deleteMessage.type === 'error' && <Typography color="error">{deleteMessage.content}</Typography>}
      <form>
        <TextField
          label="ID del ejercicio a eliminar"
          variant="outlined"
          fullWidth
          margin="normal"
          type="number"
          value={ejercicioIdToDelete}
          onChange={(e) => setEjercicioIdToDelete(e.target.value)}
        />
        <Button
          className="eliminar-ejercicio-btn"
          variant="contained"
          color="primary"
          onClick={handleOpenDeleteConfirmation}
        >
          Eliminar Ejercicio
        </Button>
      </form>

      {/* Diálogo de confirmación */}
      <Dialog
        open={deleteConfirmationOpen}
        onClose={() => {
          handleCloseDeleteConfirmation();
          resetDeleteMessage(); // Resetear el mensaje al cerrar el diálogo
        }}
      >
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent>
          <Typography>
            ¿Estás seguro de que deseas eliminar este ejercicio?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteConfirmation} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleDeleteEjercicio} color="secondary">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>

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

export default EliminarEjercicios;
