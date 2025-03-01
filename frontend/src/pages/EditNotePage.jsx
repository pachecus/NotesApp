import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";  // Reemplazamos useHistory por useNavigate
import { getNoteById, updateNote } from "../services/NoteService";  // Asegúrate de tener estas funciones en el servicio
import { NoteContext } from "../context/NoteContext";  // Contexto para actualizar las notas

export const EditNotePage = () => {
  const { id } = useParams();  // Obtenemos el ID de la nota desde la URL
  const navigate = useNavigate();  // Usamos useNavigate en lugar de useHistory
  const { notes, setNotes } = useContext(NoteContext);  // Usamos el contexto para acceder y actualizar las notas
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);  // Nuevo estado para indicar si estamos cargando la nota

  // Cargar la nota cuando el componente se monte
  useEffect(() => {
    const fetchNote = async () => {
      try {
        const note = await getNoteById(id);  // Llamamos a la API para obtener la nota
        console.log('Nota data: ', note);
        setTitle(note.title);
        setContent(note.content);
        setLoading(false);  // Terminamos de cargar los datos
      } catch (error) {
        console.error('Error al obtener la nota:', error);
        setLoading(false);  // Aseguramos que se termine el estado de carga incluso si hay error
      }
    };

    fetchNote();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content) return;

    const updatedNote = { title, content };

    try {
      // Actualizamos la nota en el backend
      await updateNote(id, updatedNote);

      // Actualizamos la nota en el contexto
      const updatedNotes = notes.map((note) =>
        note.id === parseInt(id) ? { ...note, title, content } : note
      );
      setNotes(updatedNotes);

      // Redirigimos a la página principal de notas
      navigate("/");  // Reemplazamos history.push("/") por navigate("/")
    } catch (error) {
      console.error('Error al actualizar la nota:', error);
    }
  };

  if (loading) {
    return <div>Cargando...</div>;  // Mensaje de carga mientras esperamos los datos
  }

  return (
    <div>
      <h1>Editar Nota</h1>
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
        <button type="submit">Guardar Cambios</button>
      </form>
    </div>
  );
};
