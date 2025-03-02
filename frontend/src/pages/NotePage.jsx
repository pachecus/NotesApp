import { NoteForm } from "../components/NoteForm"
import { NoteList } from "../components/NoteList"
import { useContext, useEffect } from "react"
import { NoteContext } from '../context/NoteContext';
import { getNotes } from "../services/NoteService";

// This is the 'main' page
export const NotePage = () => {
    const { notes, setNotes } = useContext(NoteContext)

    // Load all the notes ass soon as this page is loaded and when the notes in the context are changed
    useEffect(() => {
        const fetchNotes = async () => {
          try {
            const allNotes = await getNotes(); 
            setNotes(allNotes); 
          } catch (error) {
            console.error('Error when retrieving all the notes:', error);
          }
        };
    
        fetchNotes();
      }, [setNotes]);
    
    return (
        <div>
            <h1>My Notes</h1>
            <NoteForm /> {/* This is the form to add new notes */}
            <NoteList notes={notes} setNotes={setNotes}/> {/* List of all the notes */}
        </div>
    )
}
