const Note = require('../models/note');

// Crear una nueva nota
const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const newNote = await Note.create({ title, content });
    res.status(201).json(newNote);
    console.log('Se creo una nueva nota');
    console.log(title, content)
  } catch (error) {
    console.error('Error al crear la nota:', error);
    res.status(500).json({ message: 'Error al crear la nota' });
  }
};

// // Obtener todas las notas
// const getNotes = async (req, res) => {
//   try {
//     const notes = await Note.findAll();
//     console.log(notes);
//     res.status(200).json(notes);
//   } catch (error) {
//     console.error('Error al obtener las notas:', error);
//     res.status(500).json({ message: 'Error al obtener las notas' });
//   }
// };

// Controllers/notesController.js

// const getNotes = async (req, res) => {
//     const { archived } = req.query;  // Obtener el valor de 'archived' de la consulta
  
//     try {
//       // Si 'archived' es 'true', obtenemos solo las notas archivadas
//       // Si 'archived' es 'false' o no se pasa, obtenemos solo las notas activas
//       const notes = archived === 'true'
//         ? await Note.findAll({ where: { archived: true } })  // Notas archivadas
//         : await Note.findAll({ where: { archived: false } });  // Notas activas
  
//       console.log(notes);  // Mostrar las notas obtenidas (opcional para depuración)
//       res.status(200).json(notes);  // Devolver las notas como respuesta
//     } catch (error) {
//       console.error('Error al obtener las notas:', error);
//       res.status(500).json({ message: 'Error al obtener las notas' });
//     }
//   };

const getNotes = async (req, res) => {
    const { archived } = req.query;  // Obtener si el parámetro 'archived' está presente en la consulta
    
    try {
      let notes;
  
      // Si 'archived' es 'true', obtener solo las notas archivadas
      if (archived === 'true') {
        notes = await Note.findAll({ where: { archived: true } });
      }
      // Si 'archived' es 'false', obtener solo las notas activas
      else if (archived === 'false') {
        notes = await Note.findAll({ where: { archived: false } });
      }
      // Si no se pasa ningún valor para 'archived', obtener todas las notas
      else {
        notes = await Note.findAll();  // Devuelve todas las notas (activas y archivadas)
      }
  
      console.log(notes);  // Opcional: para depuración
      res.status(200).json(notes);  // Devolver las notas como respuesta
    } catch (error) {
      console.error('Error al obtener las notas:', error);
      res.status(500).json({ message: 'Error al obtener las notas' });
    }
  };
  
  
  

const updateNote = async (req, res) => {
    const { id } = req.params;  // El ID de la nota que queremos actualizar
    const { title, content } = req.body;  // Los nuevos datos de la nota
  
    try {
      const note = await Note.findByPk(id);  // Buscar la nota por su ID
  
      if (!note) {
        return res.status(404).json({ message: 'Nota no encontrada' });
      }
  
      // Actualizar los campos de la nota
      note.title = title || note.title;
      note.content = content || note.content;
  
      // Guardar los cambios
      await note.save();
  
      // Responder con la nota actualizada
      return res.json(note);
    } catch (error) {
      console.error('Error al actualizar la nota:', error);
      return res.status(500).json({ message: 'Error al actualizar la nota' });
    }
  };

// Obtener una nota por ID
const getNoteById = async (req, res) => {
    const { id } = req.params; // Obtener el ID de la URL
  
    try {
      const note = await Note.findByPk(id); // Buscar la nota por su ID
  
      if (!note) {
        return res.status(404).json({ message: 'Nota no encontrada' });
      }
  
      res.status(200).json(note); // Si se encuentra la nota, devolverla
    } catch (error) {
      console.error('Error al obtener la nota por ID:', error);
      res.status(500).json({ message: 'Error al obtener la nota' });
    }
};
  
// Eliminar una nota por ID
const deleteNote = async (req, res) => {
    const { id } = req.params;  // El ID de la nota que queremos eliminar
  
    try {
      const note = await Note.findByPk(id);  // Buscar la nota por su ID
  
      if (!note) {
        return res.status(404).json({ message: 'Nota no encontrada' });
      }
  
      // Eliminar la nota
      await note.destroy();
  
      res.status(200).json({ message: 'Nota eliminada correctamente' });
    } catch (error) {
      console.error('Error al eliminar la nota:', error);
      res.status(500).json({ message: 'Error al eliminar la nota' });
    }
  };

  // Controllers/notesController.js

// Archivar o desarchivar una nota
const archiveNote = async (req, res) => {
    const { id } = req.params;  // El ID de la nota que queremos actualizar
  
    try {
      const note = await Note.findByPk(id);  // Buscar la nota por su ID
  
      if (!note) {
        return res.status(404).json({ message: 'Nota no encontrada' });
      }
  
      // Cambiar el estado de 'archived'
      note.archived = !note.archived;  // Si estaba 'false', lo cambia a 'true' y viceversa
  
      // Guardar los cambios
      await note.save();
  
      // Responder con la nota actualizada
      return res.status(200).json(note);
    } catch (error) {
      console.error('Error al archivar o desarchivar la nota:', error);
      return res.status(500).json({ message: 'Error al archivar o desarchivar la nota' });
    }
  };
  
  
  module.exports = { createNote, getNotes, updateNote, getNoteById, deleteNote, archiveNote };
  
  


