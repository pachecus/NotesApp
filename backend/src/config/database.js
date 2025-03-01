const { Sequelize } = require('sequelize');

// Configuración de Sequelize para SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'  // Ubicación del archivo de base de datos
});

module.exports = sequelize;