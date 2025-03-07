import { NoteForm } from "../components/NoteForm"
import { NoteList } from "../components/NoteList"
import { useContext, useEffect } from "react"
import { NoteContext } from '../context/NoteContext';
import { getNotes } from "../services/NoteService";
import { CategoriesForm } from "../components/CategoriesForm";
import { CategoriesList } from "../components/CategoriesList";
import { CategoriesContext } from "../context/CategoriesContext";
import { getCategories } from "../services/CategoryService";

// This is the 'main' page
export const NotePage = () => {
    const { notes, setNotes } = useContext(NoteContext)
    const { categories, setCategories} = useContext(CategoriesContext)

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

        const fetchCategories = async () => {
          try {
            const allCategories = await getCategories(); 
            setCategories(allCategories); 
          } catch (error) {
            console.error('Error when retrieving all the categories:', error);
          }
        };
        fetchCategories();
        fetchNotes();
      }, [setNotes]);
    
    return (
        <div className="main_container">
          <div>
            <CategoriesForm />
            <CategoriesList categories={categories} setCategories={setCategories}/>
          </div>
          <div>
            <h1>My Notes</h1>
            <NoteForm /> {/* This is the form to add new notes */}
            <NoteList notes={notes} setNotes={setNotes}/> {/* List of all the notes */}
          </div>
        </div>
    )
}
