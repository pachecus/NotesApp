import React, { createContext, useState } from 'react';
import { createNote } from '../services/NoteService';

// Crear el contexto para las notas
export const NoteContext = createContext();

export const NoteProvider = ({ children }) => {

  
  const [notes, setNotes] = useState([]);

  // Agregar una nueva nota
  const addNote = (newNote) => {
    setNotes([...notes, newNote]);
    createNote(newNote); // Llamar a la función createNote
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, setNotes }}>
      {children}
    </NoteContext.Provider>
  );
};