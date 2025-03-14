import { Link } from "react-router-dom"; // I use this hook to navigate to the edit page
import { deleteNote, toggleArchive, getNotes } from "../services/NoteService";

export const NoteList = ({ notes, setNotes }) => {

  // When deleting a note, the deleteNote function is called, and the deleted note is removed from all the notes
  const handleDelete = async (id) => {
    try {
      await deleteNote(id);
      setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
    } catch (error) {
      console.error('Error when deleting the note:', error);
    }
  };

  // Function that toggles the state of archived and unarchived of a note
  const handleToggleArchive = async (id) => {
    try {
      const updatedNote = await toggleArchive(id);
      // Setting the new state of archived of a note
      setNotes(prevNotes => 
        prevNotes.map(note => 
          note.id === id ? { ...note, archived: updatedNote.archived } : note
        )
      );
    } catch (error) {
      console.error('Error when archiving or unarchiving a note:', error);
    }
  };

  // Function to get all the current saved notes
  const handleListAllNotes = async () => {
    try {
      const allNotes = await getNotes(); 
      setNotes(allNotes);  
    } catch (error) {
      console.error('Error when getting all the notes:', error);
    }
  };

  // Function to get all the unarchived, or active, notes
  const handleListActiveNotes = async () => {
    try {
      const activeNotes = await getNotes('false');  // The same function is used for getting all notes and only getting unarchived notes, but 'false' is passed through the parammeters
      setNotes(activeNotes); 
    } catch (error) {
      console.error('Error al obtener las notas activas:', error);
    }
  };

  // Function to get all the archived notes
  const handleListArchivedNotes = async () => {
    try {
      const archivedNotes = await getNotes('true'); // The same function is used aswell, but now with 'true'
      setNotes(archivedNotes); 
    } catch (error) {
      console.error('Error al obtener las notas archivadas:', error);
    }
  };

  return (
    <div>
      <h2>All my Notes</h2>
      {/* Filter to see all notes, active notes and archived notes */}
      <div>
        <button onClick={handleListAllNotes}>All Notes</button>
        <button onClick={handleListActiveNotes}>Active Notes</button>
        <button onClick={handleListArchivedNotes}>Archived Notes</button>
      </div>

      {notes.length === 0 ? ( 
        <p>There are no notes.</p> // Id there are no notes
      ) : (
        <ul>
          {notes.map((note) => ( // For each note show ,title, content, edit button that redirects to edit page, delete button and archived/unarchived button
            <li key={note.id}>
              <strong>{note.title}</strong>
              <p>{note.content}</p>
              {/* {note.Categories.map(c => {
                console.log(c.name);
                return(
                  <p key={c.id}>{c.name}</p>
                )
              })} */}
              {/* <p>Categorias: {note.Categories.map((c) => c.name).join(', ')}</p> */}
              <p>{note.Categories && note.Categories.length > 0 ? 'Categories: ' + note.Categories.map((c) => c.name).join(', ') : 'No categories'}</p>


              <Link to={`/edit/${note.id}`}>
                <button>Edit</button> 
              </Link>
              <button onClick={() => handleDelete(note.id)}>Delete</button>              
              <button onClick={() => handleToggleArchive(note.id)}>
                {note.archived ? 'Unarchive' : 'Archive'}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

