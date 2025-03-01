import { NoteForm } from "../components/NoteForm"
import { NoteList } from "../components/NoteList"
import { useContext, useEffect } from "react"
import { NoteContext } from '../context/NoteContext';
import { getNotes } from "../services/NoteService";


export const NotePage = () => {
    const { notes, setNotes } = useContext(NoteContext)

    useEffect(() => {
        // Al montar el componente, obtenemos las notas del servidor
        const fetchNotes = async () => {
          try {
            const allNotes = await getNotes(); // Llamada a la API
            console.log('Todas las notas');
            console.log(allNotes);
            setNotes(allNotes); // Actualizamos el Context con las notas obtenidas
            console.log('Notasssssssssssssss');
            console.log(allNotes);
          } catch (error) {
            console.error('Error al obtener las notas:', error);
          }
        };
    
        fetchNotes(); // Llamamos a la función para obtener las notas
      }, [setNotes]);
    console.log(notes)
    return (
        <div>
            <h1>Mis notas</h1>
            <NoteForm />
            <NoteList notes={notes} setNotes={setNotes}/>
        </div>
    )
}
