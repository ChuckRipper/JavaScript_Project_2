const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');
const User = require('./userModel');

const Room = sequelize.define('Room', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  room_code: {
    type: DataTypes.STRING(10),
    allowNull: false,
    unique: true,
  },
  creator_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  timestamps: false,
  tableName: 'Rooms',
});

Room.belongsTo(User, { foreignKey: 'creator_id' });

module.exports = Room;
