const request = require('supertest');
const app = require('../../server/app');
const Score = require('../../server/models/scoreModel');

jest.mock('../../server/models/scoreModel');

describe('Game Routes', () => {
  describe('POST /api/scores', () => {
    it('should create a new score', async () => {
      const score = { userId: 1, score: 100, gameTime: 120 };
      Score.create.mockResolvedValue(score);

      const response = await request(app)
        .post('/api/scores')
        .send(score)
        .expect(201);

      expect(response.body).toEqual(score);
    });
  });

  // Additional integration tests
});
