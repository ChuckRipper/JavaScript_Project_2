const { createRoom, joinRoom, getRoom } = require('../controllers/roomController');
const Room = require('../models/roomModel');
const RoomPlayer = require('../models/roomPlayerModel');

jest.mock('../models/roomModel');
jest.mock('../models/roomPlayerModel');

describe('Room Controller', () => {
  describe('createRoom', () => {
    it('should create a new room', async () => {
      const req = { body: { userId: 1, roomCode: 'ABC123' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      Room.create.mockResolvedValue(req.body);

      await createRoom(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(req.body);
    });
  });

  // Additional tests for joinRoom, getRoom
});
