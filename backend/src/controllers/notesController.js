// import the noteModel
const Note = require('../models/noteModel');
const Category = require('../models/categoryModel')

// Endpoint for creating a new note
const createNote = async (req, res) => {
  try {
    // Creation of a Note with Title and Content
    const { title, content, noteCategories } = req.body;

    // Create a new note in the Database
    const newNote = await Note.create({ title, content });

    const categories = await Category.findAll({
      where: {
        id: noteCategories.map(category => category.id)
      }
    });

    // 3. Asociar las categorías a la nota
    await newNote.addCategories(categories);

    // Adding categories for the note
    // noteCategories.forEach(category => {
      // console.log(`ID: ${category.id}`);
      // console.log(`Name: ${category.name}`);
      // console.log(`Created At: ${category.createdAt}`);
      // console.log(`Updated At: ${category.updatedAt}`);
    // });

    // Successfull note Creation
    console.log('New Note Created with title:', title, " and content:", content);
    console.log('and categories');
    noteCategories.forEach(c => {
      console.log('ID: ', c.id);
      console.log('Name: ', c.name);
      console.log('');
    });
    res.status(201).json(newNote);
  } catch (error) {
    // Error when creating the Note
    console.error('Error when creating note:', error);
    res.status(500).json({ message: 'Error when creating note' });
  }
};

// Endpoint for retriveing all the Notes
const getNotes = async (req, res) => {
    const { archived } = req.query; // true = archived notes, false = active notes, nothing = all notes
    try {
      let notes;
      if (archived === 'true') {
        notes = await Note.findAll({ 
          where: { archived: true },
          include: {
            model: Category,
            through: { attributes: [] } // Omite la tabla intermedia
          }
      });
        console.log('Requesting archived notes');
      }
      else if (archived === 'false') {
        notes = await Note.findAll({
           where: { archived: false },
           include: {
            model: Category,
            through: { attributes: [] } // Omite la tabla intermedia
          }
      });
        console.log('Requesting active notes');
      }
      else {
        notes = await Note.findAll({
          include: {
            model: Category,
            through: { attributes: [] } // Omite la tabla intermedia
          }
       }); 
        console.log('Requesting all notes');
      }
      console.log('Las notas son: ', notes);
      res.status(200).json(notes); 
    } catch (error) {
      console.error('Error when retriveing notes:', error);
      res.status(500).json({ message: 'Error when retriveing notes' });
    }
  };
  
// Endpoint for updating a note
const updateNote = async (req, res) => {
    const { id } = req.params;  // Note's id
    const { title, content } = req.body;  // Notes title and content
  
    try {
      const note = await Note.findByPk(id);  // find the note that has de the id in the database
      if (!note) { // The note was not found
        return res.status(404).json({ message: 'Note not found' });
      }
  
      // note.title = title || note.title;
      // note.content = content || note.content;
      
      
      note.title = title;
      note.content = content;
  
      // Save the updated note in the database
      await note.save();
      console.log('Note updated with title:', title, " and content: ",content);
      return res.json(note);
    } catch (error) {
      console.error('Error when updating note:', error);
      return res.status(500).json({ message: 'Error when updating note' });
    }
  };

// Endpoint to get an specific note by its id
const getNoteById = async (req, res) => {
    const { id } = req.params; 
    try {
      // find the note with the id in the database
      const note = await Note.findByPk(id, {
        include: [{
          model: Category,
          through: { attributes: [] },
        }]
      }); 
  
      // If the note does not exist return 404
      if (!note) {
        return res.status(404).json({ message: 'Nota no encontrada' });
      }
      console.log('Getting note by id:', id);
      res.status(200).json(note); 
    } catch (error) {
      console.error('Error when retriveing note by ID:', error);
      res.status(500).json({ message: 'Error when retriveing note by ID' });
    }
};
  
// Endpoint to delete an id
const deleteNote = async (req, res) => {
    const { id } = req.params; 
    try {
      // Find the note in the database by its id
      const note = await Note.findByPk(id);  
  
      if (!note) {
        return res.status(404).json({ message: 'Nota no encontrada' });
      }
      // If the note is found then it must be destroyed
      await note.destroy();
      console.log('Deleting note by id:', id);
      res.status(200).json({ message: 'Note deletetion successful' });
    } catch (error) {
      console.error('Error when deleting note:', error);
      res.status(500).json({ message: 'Error when deleting note' });
    }
  };

// Endpoint to archive/unarchive(active) a note
const archiveNote = async (req, res) => {
    const { id } = req.params;  

    try {
      // Find the note using its id in the database
      const note = await Note.findByPk(id);  
  
      if (!note) {
        return res.status(404).json({ message: 'Nota no encontrada' });
      }
      
      // Change the current state of archive to the opposite
      note.archived = !note.archived;  
      // Save the updated note in the database
      await note.save();
      console.log('Changed archived status to note with id:', id);
      return res.status(200).json(note);
    } catch (error) {
      console.error('Error when archiving or unarchiving a note:', error);
      return res.status(500).json({ message: 'Error when archiving or unarchiving a note' });
    }
  };
  
  // Export the functions created in this file so they can be used from other files
  module.exports = { createNote, getNotes, updateNote, getNoteById, deleteNote, archiveNote };