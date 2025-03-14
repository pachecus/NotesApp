import React, { useState, useContext } from 'react';
import { NoteContext } from '../context/NoteContext';  // NoteContext to add new notes
import { CategoriesContext } from '../context/CategoriesContext';


export const NoteForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [ noteCategories, setNoteCategories ] = useState([]);
    const { addNote } = useContext(NoteContext); // addNote adds a new note to the context and to the database
    const { categories } = useContext(CategoriesContext);
  
    // When a new note is submmited its added to the context and the title and content of the form are emptied
    const handleSubmit = (e) => {
      e.preventDefault();
      if (!title || !content) return;
      // addNote({ title, content });
      addNote({ title, content, noteCategories});
      setTitle('');
      setContent('');
      // setNoteCategories([]);
    };



    const handleClick = (e) => {
      console.log('handle Click');
      if (e.target.value === "") {return;}
      const category = JSON.parse(e.target.value);

      // Si la categoria no fue seleccionada
      if (!noteCategories.some((cat) => cat.id === category.id)) {
        setNoteCategories([...noteCategories, category]);
      }

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
          {categories.length === 0 ? ( 
                <p>There are no categories yet.</p> // Id there are no notes
            ) : (
                <select onChange={handleClick}>
                <option value="">Select the categories</option>
                {categories.map((category) => { // For each note show ,title, content, edit button that redirects to edit page, delete button and archived/unarchived button
                    // if (!(category in noteCategories)) { 
                      return (
                        <option key={category.id} value={JSON.stringify(category)}>{category.name}</option>
                      )
                    }
                // }
                )}
                </select>
            )}
            {noteCategories.length === 0 ? ( 
                <p>You have not selected categories for this note yet</p> // Id there are no notes
            ) : (
                <ul>
                {noteCategories.map((category) => ( // For each note show ,title, content, edit button that redirects to edit page, delete button and archived/unarchived button
                    <li key={category.id}>
                      <p>{category.name}</p>
                    </li>
                ))}
                </ul>
            )}
        </div>
        <button type="submit">Save Note</button>
      </form>
    );
}  
