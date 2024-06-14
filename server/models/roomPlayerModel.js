const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');
const Room = require('./roomModel');
const User = require('./userModel');

const RoomPlayer = sequelize.define('RoomPlayer', {
  room_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Room,
      key: 'id',
    },
    primaryKey: true,
  },
  player_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
    primaryKey: true,
  },
}, {
  timestamps: false,
  tableName: 'RoomPlayers',
});

RoomPlayer.belongsTo(Room, { foreignKey: 'room_id' });
RoomPlayer.belongsTo(User, { foreignKey: 'player_id' });

module.exports = RoomPlayer;
