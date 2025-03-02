import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import { getNoteById, updateNote } from "../services/NoteService"; 
import { NoteContext } from "../context/NoteContext";  

export const EditNotePage = () => {
  const { id } = useParams(); // usted to get the note that wants to be edited
  const navigate = useNavigate();  // to navigate to main page once the edited note has been submmited
  const { notes, setNotes } = useContext(NoteContext);  // to update the context with the updated note
  const [title, setTitle] = useState(''); // note that is going to be edited title
  const [content, setContent] = useState(''); // note's thats going to be edited content
  const [loading, setLoading] = useState(true);  // variable used to know if the note that wants to be edited had already been loaded or not

  // when this page is loaded the first thing to do is retrieve the note that is going to be edited
  useEffect(() => {
    const fetchNote = async () => {
      try {
        const note = await getNoteById(id);  
        setTitle(note.title);
        setContent(note.content);
        setLoading(false); 
      } catch (error) {
        console.error('Error when retrieving note by id:', error);
        setLoading(false);  
      }
    };

    fetchNote();
  }, [id]);

  // Once the note is edited is has to be updated in the database
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) return;

    const updatedNote = { title, content };

    try {
      // update the database
      await updateNote(id, updatedNote);

      // update the notes
      const updatedNotes = notes.map((note) =>
        note.id === parseInt(id) ? { ...note, title, content } : note
      );
      setNotes(updatedNotes);

      // navigate to the main page (NotePage.jsx)
      navigate("/");  
    } catch (error) {
      console.error('Error when updating note:', error);
    }
  };

  if (loading) { // While the note is not loaded this message will be displayed
    return <div>Loading...</div>;  // I added this because i already have it in another React proyect i made: MovieSearcher2.0 https://github.com/pachecus/MovieSearcher2.0
                                    // and it made more sense in that proyect since more data is loaded so it does show the message.
                                    // In this proyect it doesnt since its a very small note that has to be loaded.
  }

  return (
    <div>
      <h1>Edit Note</h1>
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
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};
