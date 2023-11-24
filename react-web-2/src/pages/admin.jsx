// AdminPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Button, Grid } from '@mui/material';
import Background from './Background';

const Admin = () => {
  return (
    <>
      <Background />
      <Container maxWidth="md" style={{ marginTop: '20px', position: 'relative', zIndex: 1 }}>
        <Typography variant="h4" component="h2" gutterBottom style={{ color: '#fff' }}>
          Panel de Administrador
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Link to="/crearEjercicios" style={{ textDecoration: 'none' }}>
              <Button variant="contained" color="primary" style={{ width: '100%', height: '100px' }}>
                Crear Ejercicios
              </Button>
            </Link>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Link to="/eliminarEjercicios" style={{ textDecoration: 'none' }}>
              <Button variant="contained" color="primary" style={{ width: '100%', height: '100px' }}>
                Eliminar Ejercicios
              </Button>
            </Link>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Link to="/actualizarEjercicios" style={{ textDecoration: 'none' }}>
              <Button variant="contained" color="primary" style={{ width: '100%', height: '100px' }}>
                Actualizar Ejercicios
              </Button>
            </Link>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Link to="/obtenerEjercicios" style={{ textDecoration: 'none' }}>
              <Button variant="contained" color="primary" style={{ width: '100%', height: '100px' }}>
                Obtener Ejercicios
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Admin;
