const Room = require('../models/roomModel');
const RoomPlayer = require('../models/roomPlayerModel');
const User = require('../models/userModel');

exports.createRoom = async (req, res) => {
  const { userId, roomCode } = req.body;
  try {
    const room = await Room.create({ creator_id: userId, room_code: roomCode });
    await RoomPlayer.create({ room_id: room.id, player_id: userId });
    res.status(201).json(room);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.joinRoom = async (req, res) => {
  const { userId, roomCode } = req.body;
  try {
    const room = await Room.findOne({ where: { room_code: roomCode } });
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }
    await RoomPlayer.create({ room_id: room.id, player_id: userId });
    res.status(200).json(room);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getRoom = async (req, res) => {
  try {
    const room = await Room.findByPk(req.params.roomId, {
      include: [
        {
          model: RoomPlayer,
          include: [User],
        },
      ],
    });
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }
    res.status(200).json(room);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
