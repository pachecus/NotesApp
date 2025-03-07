import React, { createContext, useState } from 'react';
import { createCategory } from '../services/CategoryService';

export const CategoriesContext = createContext(); // Create a new context to save the notes

export const CategoriesProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);

  const addCategory = async (category) => { 
    try {
      const savedCategory = await createCategory(category); 
  
      if (!savedCategory || typeof savedCategory !== 'object') {
        throw new Error('The category is valid');
      }
  
      // Add the new note to the context. I had to ensure that i append an array since the notes.map() function only works on arrays (i just discovered that)
      setCategories((prevCategories) => [...(Array.isArray(prevCategories) ? prevCategories : []), savedCategory]);
      
    } catch (error) {
      console.error('Error al guardar la categoria:', error);
    }
  };
  
  
  
  // provide the notes, the function to add a Note (to context and to database) and the SetNotes function
  return (
    <CategoriesContext.Provider value={{ categories, addCategory, setCategories }}>
      {children}
    </CategoriesContext.Provider>
  );
};