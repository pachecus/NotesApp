const express = require('express');
const { createNote, getNotes, updateNote, getNoteById, deleteNote, archiveNote } = require('../controllers/notesController');
const router = express.Router();


router.post('/', createNote);  // Ruta para crear una nota
router.get('/', getNotes);     // Ruta para obtener todas las notas
router.get('/:id', getNoteById); // Ruta para obtener una nota por su ID
router.put('/:id', updateNote); // Ruta para actualizar una nota
router.delete('/:id', deleteNote); // Ruta para eliminar una nota
router.patch('/:id/archive', archiveNote);



module.exports = router;

