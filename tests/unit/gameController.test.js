const { addScore, updateScore, getScores, deleteScore } = require('../controllers/gameController');
const Score = require('../models/scoreModel');

jest.mock('../models/scoreModel');

describe('Game Controller', () => {
  describe('addScore', () => {
    it('should add a new score', async () => {
      const req = { body: { userId: 1, score: 100, gameTime: 120 } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      Score.create.mockResolvedValue(req.body);

      await addScore(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(req.body);
    });
  });

  // Additional tests for updateScore, getScores, deleteScore
});
