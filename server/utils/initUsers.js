const bcrypt = require('bcrypt');
// const config = require('../config/default.json');
const config = require('../config/production.json');
const sequelize = require('./db');
const User = require('../models/userModel');
const Sequelize = require('sequelize')

const initUsers = async () => {
  try {
    //await sequelize.sync({ force: true });
    await Sequelize.sync({ force: true });

    const adminPassword = await bcrypt.hash(config.get('adminUser.password'), 10);
    const userPassword = await bcrypt.hash(config.get('regularUser.password'), 10);

    await User.bulkCreate([
      {
        username: config.get('adminUser.username'),
        password: adminPassword,
        email: config.get('adminUser.email'),
        role: 'admin'
      },
      {
        username: config.get('regularUser.username'),
        password: userPassword,
        email: config.get('regularUser.email'),
        role: 'user'
      }
    ]);

    console.log('Users have been initialized');
    process.exit(0);
  } catch (error) {
    console.error('Error initializing users:', error);
    process.exit(1);
  }
};

initUsers();
