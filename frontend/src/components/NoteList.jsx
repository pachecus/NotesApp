import { Link } from "react-router-dom";  // Importamos Link para la navegación
import { deleteNote, toggleArchive, getNotes } from "../services/NoteService";  // Importamos las funciones del servicio

export const NoteList = ({ notes, setNotes }) => {
  // Función para eliminar una nota
  const handleDelete = async (id) => {
    try {
      await deleteNote(id); // Llamamos al servicio para eliminar la nota
      // Después de eliminar la nota, recargamos la lista de notas
      setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
    } catch (error) {
      console.error('Error al eliminar la nota:', error);
    }
  };

  // Función para archivar o desarchivar una nota
  const handleToggleArchive = async (id) => {
    try {
      const updatedNote = await toggleArchive(id); // Llamamos al servicio para archivar o desarchivar
      // Actualizamos el estado de las notas
      setNotes(prevNotes => 
        prevNotes.map(note => 
          note.id === id ? { ...note, archived: updatedNote.archived } : note
        )
      );
    } catch (error) {
      console.error('Error al archivar o desarchivar la nota:', error);
    }
  };

  // Función para listar todas las notas
  const handleListAllNotes = async () => {
    try {
      const allNotes = await getNotes();  // Llamamos a getNotes sin parámetros para obtener todas las notas
      setNotes(allNotes);  // Actualizamos el estado con todas las notas
    } catch (error) {
      console.error('Error al obtener todas las notas:', error);
    }
  };

  // Función para listar las notas activas
  const handleListActiveNotes = async () => {
    try {
      const activeNotes = await getNotes('false');  // Llamamos a getNotes con 'archived=false' para obtener las activas
      setNotes(activeNotes);  // Actualizamos el estado con las notas activas
    } catch (error) {
      console.error('Error al obtener las notas activas:', error);
    }
  };

  // Función para listar las notas archivadas
  const handleListArchivedNotes = async () => {
    try {
      const archivedNotes = await getNotes('true');  // Llamamos a getNotes con 'archived=true' para obtener las archivadas
      setNotes(archivedNotes);  // Actualizamos el estado con las notas archivadas
    } catch (error) {
      console.error('Error al obtener las notas archivadas:', error);
    }
  };

  return (
    <div>
      <h2>Lista de Notas</h2>

      {/* Botones para filtrar notas activas, archivadas o todas */}
      <div>
        <button onClick={handleListAllNotes}>Mostrar Todas las Notas</button>
        <button onClick={handleListActiveNotes}>Mostrar Notas Activas</button>
        <button onClick={handleListArchivedNotes}>Mostrar Notas Archivadas</button>
      </div>

      {notes.length === 0 ? (
        <p>No tienes notas guardadas.</p>
      ) : (
        <ul>
          {notes.map((note) => (
            <li key={note.id}>
              <strong>{note.title}</strong>
              <p>{note.content}</p>
              <Link to={`/edit/${note.id}`}>
                <button>Editar</button> {/* Botón para editar */}
              </Link>
              <button onClick={() => handleDelete(note.id)}>Eliminar</button> {/* Botón para eliminar */}
              
              {/* Botón para archivar o desarchivar */}
              <button onClick={() => handleToggleArchive(note.id)}>
                {note.archived ? 'Desarchivar' : 'Archivar'}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
