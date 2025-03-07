const { DataTypes } = require('sequelize');
// Sequalize instance that has the database
const sequelize = require('../config/database');
const Category = require ('./categoryModel');

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

const NoteCategory = sequelize.define('NoteCategory', {}, { timestamps: false });

Note.belongsToMany(Category, { through: NoteCategory });
Category.belongsToMany(Note, { through: NoteCategory });

module.exports = Note;
