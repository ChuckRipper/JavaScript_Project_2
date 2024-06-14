const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../models/userModel');

exports.hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

exports.comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

exports.generateToken = (userId) => {
  return jwt.sign({ userId }, config.get('jwtSecret'), { expiresIn: '1h' });
};

exports.verifyToken = (token) => {
  return jwt.verify(token, config.get('jwtSecret'));
};
