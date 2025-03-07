const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Define a category with name
const Category = sequelize.define('Category', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

// Export the Note model so it can be used in other files
module.exports = Category;