const express = require('express');
// Functions that are called by each one of the routes
const { createNote, getNotes, updateNote, getNoteById, deleteNote, archiveNote } = require('../controllers/notesController');
const router = express.Router();

router.post('/', createNote);  // Route for creating a note
router.get('/', getNotes);     // Route for getting all notes
router.get('/:id', getNoteById); // Route for getting a note by its id
router.put('/:id', updateNote); // Route for updating a note
router.delete('/:id', deleteNote); // Route for deleting a note
router.patch('/:id/archive', archiveNote); // Route for archiving a note

// Exporting the routes so they can be used from other files
module.exports = router;

