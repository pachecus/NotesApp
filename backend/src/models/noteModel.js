const { DataTypes } = require('sequelize');
// Sequalize instance that has the database
const sequelize = require('../config/database');

// Define a note with title, content and a default state of archived as false (not archived)
const Note = sequelize.define('Note', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  archived: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

// Export the Note model so it can be used in other files
module.exports = Note;
