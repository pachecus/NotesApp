const Category = require('../models/categoryModel');

// Endpoint for creating a new category
const createCategory = async (req, res) => {
  try {
    // Creation of a Category with Name
    const { category } = req.body;
    // Create a new Category in the Database
    const newCategory = await Category.create({ name: category });
    // Successfull Category Creation
    console.log('New Category Added:', category);
    res.status(201).json(newCategory);
  } catch (error) {
    // Error when creating the Note
    console.error('Error when creating category:', error);
    res.status(500).json({ message: 'Error when creating category' });
  }
};

// Endpoint for retriveing all the Categories
const getCategories = async (req, res) => {
    try {
      let categories = await Category.findAll();
      res.status(200).json(categories); 
    } catch (error) {
      console.error('Error when retriveing categories:', error);
      res.status(500).json({ message: 'Error when retriveing categories' });
    }
  };

  // Endpoint to delete an id
const deleteCategory = async (req, res) => {
  const { id } = req.params; 
  try {
    // Find the category in the database by its id
    const category = await Category.findByPk(id);  

    if (!category) {
      return res.status(404).json({ message: 'Categoria no encontrada' });
    }
    // If the category is found then it must be destroyed
    await category.destroy();
    console.log('Deleting category by id:', id);
    res.status(200).json({ message: 'Category deletetion successful' });
  } catch (error) {
    console.error('Error when deleting category:', error);
    res.status(500).json({ message: 'Error when deleting category' });
  }
};

module.exports = { createCategory, getCategories, deleteCategory };