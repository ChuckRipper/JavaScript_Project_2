const request = require('supertest');
const app = require('../../server/app');
const Room = require('../../server/models/roomModel');
const RoomPlayer = require('../../server/models/roomPlayerModel');

jest.mock('../../server/models/roomModel');
jest.mock('../../server/models/roomPlayerModel');

describe('Room Routes', () => {
  describe('POST /api/rooms', () => {
    it('should create a new room', async () => {
      const room = { userId: 1, roomCode: 'ABC123' };
      Room.create.mockResolvedValue(room);

      const response = await request(app)
        .post('/api/rooms')
        .send(room)
        .expect(201);

      expect(response.body).toEqual(room);
    });
  });

  // Additional integration tests
});
