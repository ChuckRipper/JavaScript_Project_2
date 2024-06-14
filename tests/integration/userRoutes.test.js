const request = require('supertest');
const app = require('../../server/app');
const User = require('../../server/models/userModel');

jest.mock('../../server/models/userModel');

describe('User Routes', () => {
  describe('POST /api/users/register', () => {
    it('should register a new user', async () => {
      const user = { username: 'test', email: 'test@example.com', password: 'password' };
      User.create.mockResolvedValue(user);

      const response = await request(app)
        .post('/api/users/register')
        .send(user)
        .expect(201);

      expect(response.body).toEqual(user);
    });
  });

  // Additional integration tests
});
