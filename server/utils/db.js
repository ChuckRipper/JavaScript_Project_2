// const { Sequelize } = require('sequelize');
// // const config = require('../config/default.json');
// const config = require('../config/default.json');

// const sequelize = new Sequelize(
//   config.db.database,
//   config.db.username,
//   config.db.password,
//   {
//     host: config.db.host,
//     dialect: config.db.dialect,
//   }
// );

// module.exports = sequelize;

const { Sequelize } = require('sequelize');
const config = require('config');

const dbConfig = config.get('db');

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
  }
);

sequelize.sync({ force: true }) // This line forces Sequelize to sync models with database
  .then(() => {
    console.log('Database & tables created!');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;

