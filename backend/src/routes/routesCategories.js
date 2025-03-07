const express = require('express');
// Functions that are called by each one of the routes
const { createCategory, getCategories} = require('../controllers/categoryController');
const router = express.Router();

router.post('/', createCategory);
router.get('/', getCategories);

// Exporting the routes so they can be used from other files
module.exports = router;

