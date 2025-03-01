import React, { useState, useContext } from 'react';
import { NoteContext } from '../context/NoteContext'; // Contexto para las notas


export const NoteForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const { addNote } = useContext(NoteContext); // Acción para agregar una nota
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (!title || !content) return;
      addNote({ title, content });
      setTitle('');
      setContent('');
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Título</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="content">Contenido</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
        <button type="submit">Guardar Nota</button>
      </form>
    );
}  
