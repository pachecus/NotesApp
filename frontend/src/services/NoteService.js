// frontend/src/services/NoteService.js

import axios from 'axios';

const apiUrl = 'http://localhost:5000/api/notes'; // URL del backend



export const createNote = async (note) => {
    try {
      const response = await axios.post(apiUrl, note);
      return response.data;
    } catch (error) {
      console.error('Error al crear la nota:', error);
      throw error;
    }
  };

// Obtener todas las notas
export const getNotes = async (archived) => {
    try {
      // Si 'archived' es proporcionado, lo agregamos a la URL como parámetro de consulta
      const response = await axios.get('http://localhost:5000/api/notes', {
        params: { archived }
      });
      return response.data;
    } catch (error) {
      console.error('Error al obtener las notas:', error);
      throw error;
    }
  };
  

// Obtener una nota por ID
export const getNoteById = async (id) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/notes/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener la nota:', error);
    throw error;
  }
};

// Actualizar una nota
export const updateNote = async (id, updatedNote) => {
  try {
    await axios.put(`http://localhost:5000/api/notes/${id}`, updatedNote);
  } catch (error) {
    console.error('Error al actualizar la nota:', error);
    throw error;
  }
};

// Eliminar una nota
export const deleteNote = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/notes/${id}`);
      return response.data; // Devolver la respuesta con el mensaje de éxito
    } catch (error) {
      console.error('Error al eliminar la nota:', error);
      throw error; // Lanza el error para manejarlo en el componente
    }
  };


  // Archivar o desarchivar una nota
export const toggleArchive = async (id) => {
    try {
      const response = await axios.patch(`${apiUrl}/${id}/archive`);
      return response.data;  // Nota actualizada con el nuevo estado de 'archived'
    } catch (error) {
      console.error('Error al archivar o desarchivar la nota:', error);
      throw error;
    }
  };