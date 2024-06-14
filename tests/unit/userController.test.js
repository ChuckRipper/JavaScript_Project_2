const { register, login, getUser, updateUser, deleteUser } = require('../controllers/userController');
const User = require('../models/userModel');

jest.mock('../models/userModel');

describe('User Controller', () => {
  describe('register', () => {
    it('should register a new user', async () => {
      const req = { body: { username: 'test', email: 'test@example.com', password: 'password' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      User.create.mockResolvedValue(req.body);

      await register(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(req.body);
    });
  });

  // Additional tests for login, getUser, updateUser, deleteUser
});
