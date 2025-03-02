import React, { createContext, useState } from 'react';
import { createNote } from '../services/NoteService';

export const NoteContext = createContext(); // Create a new context to save the notes

export const NoteProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);

  const addNote = async (newNote) => { 
    try {
      const savedNote = await createNote(newNote); 
  
      // i had some issues when creating a new note so i added this verification as a debugging tool
      if (!savedNote || typeof savedNote !== 'object') {
        throw new Error('The note is valid');
      }
  
      // Add the new note to the context. I had to ensure that i append an array since the notes.map() function only works on arrays (i just discovered that)
      setNotes((prevNotes) => [...(Array.isArray(prevNotes) ? prevNotes : []), savedNote]);
      
    } catch (error) {
      console.error('Error al guardar la nota:', error);
    }
  };
  
  
  
  // provide the notes, the function to add a Note (to context and to database) and the SetNotes function
  return (
    <NoteContext.Provider value={{ notes, addNote, setNotes }}>
      {children}
    </NoteContext.Provider>
  );
};