// This file contains the functions that interact with the backend
import axios from 'axios';

// url of the backend
const apiUrl = 'http://localhost:5000/api/notes'; 

// function to create a note, METHOD: POST
export const createNote = async (note) => {
    try {
      const response = await axios.post(apiUrl, note);
      return response.data;
    } catch (error) {
      console.error('Error when creating a note:', error);
      throw error;
    }
  };

// function to get all the notes, METHOD: GET
export const getNotes = async (archived) => {
    try {
      const response = await axios.get(apiUrl, {
        params: { archived }
      });
      return response.data;
    } catch (error) {
      console.error('Error when retrieving all the notes:', error);
      throw error;
    }
  };
  
// function to get a note by its id, METHOD: GET
export const getNoteById = async (id) => {
  try {
    const response = await axios.get(`${apiUrl}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error when retriveing the note:', error);
    throw error;
  }
};

// function to update a note (when editing), METHOD: PUT
export const updateNote = async (id, updatedNote) => {
  try {
    await axios.put(`${apiUrl}/${id}`, updatedNote);
  } catch (error) {
    console.error('Error when updating a note:', error);
    throw error;
  }
};

// function to delete a note, METHOD: DELETE
export const deleteNote = async (id) => {
    try {
      const response = await axios.delete(`${apiUrl}/${id}`);
      return response.data; 
    } catch (error) {
      console.error('Error when deliting a note:', error);
      throw error; 
    }
  };


// function to archive/unarchive a note, METHOD: PATCH
export const toggleArchive = async (id) => {
    try {
      const response = await axios.patch(`${apiUrl}/${id}/archive`);
      return response.data;  
    } catch (error) {
      console.error('Error al archivar o desarchivar la nota:', error);
      throw error;
    }
  };