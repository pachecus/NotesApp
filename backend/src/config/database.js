const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite', // Is a relational database
  storage: './database.sqlite' // location of the stored data
});

// Export so it can be accesed from other files
module.exports = sequelize;