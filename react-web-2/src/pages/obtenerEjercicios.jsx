import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Typography,
  Container,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Button,
  TablePagination,
} from '@mui/material';
import './agregarEjercicios.css';
import API_URL from '../config';

const obtenerEjercicios = () => {
  const [ejercicios, setEjercicios] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);

  useEffect(() => {
    const fetchEjercicios = async () => {
      try {
        const response = await axios.get(`${API_URL}/ejercicios`);
        setEjercicios(response.data);
      } catch (error) {
        console.error('Error al obtener la lista de ejercicios:', error);
      }
    };

    fetchEjercicios();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Container maxWidth="md" className="ejercicios-container">
      <Typography variant="h4" component="h2" gutterBottom>
        Lista de Ejercicios
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Dificultad</TableCell>
              <TableCell>Grupo Muscular</TableCell>
              <TableCell>ID Rutina</TableCell>
              <TableCell>Descripción</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ejercicios
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((ejercicio) => (
                <TableRow key={ejercicio.id}>
                  <TableCell>{ejercicio.id}</TableCell>
                  <TableCell>{ejercicio.nombre_ejercicio}</TableCell>
                  <TableCell>{ejercicio.dificultad}</TableCell>
                  <TableCell>{ejercicio.grupo_muscular}</TableCell>
                  <TableCell>{ejercicio.id_rutina}</TableCell>
                  <TableCell>{ejercicio.descripcion}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 15, 45]}
        component="div"
        count={ejercicios.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Button className="volver-link" style={{ marginTop: '10px' }} variant="contained" color="primary" onClick={() => window.history.back()}>
        Volver
      </Button>
    </Container>
  );
};

export default obtenerEjercicios;
