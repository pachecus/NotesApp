import React, { useState, useContext } from 'react';
import { NoteContext } from '../context/NoteContext';  // NoteContext to add new notes


export const NoteForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const { addNote } = useContext(NoteContext); // addNote adds a new note to the context and to the database
  
    // When a new note is submmited its added to the context and the title and content of the form are emptied
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
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
        <button type="submit">Save Note</button>
      </form>
    );
}  
