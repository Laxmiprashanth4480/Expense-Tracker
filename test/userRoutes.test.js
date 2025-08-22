const request = require('supertest');
const bcrypt = require('bcryptjs');

jest.mock('../models/userModel', () => ({
  findOne: jest.fn(),
  create: jest.fn(),
}));

const userModel = require('../models/userModel');
const app = require('../server');

describe('User Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/v1/users/register', () => {
    it('registers a new user', async () => {
      userModel.findOne.mockResolvedValue(null);
      userModel.create.mockResolvedValue({ _id: '1', name: 'John', email: 'john@example.com' });

      const res = await request(app)
        .post('/api/v1/users/register')
        .send({ name: 'John', email: 'john@example.com', password: 'secret123' });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(userModel.create).toHaveBeenCalled();
    });

    it('fails when email already exists', async () => {
      userModel.findOne.mockResolvedValue({ _id: '1' });

      const res = await request(app)
        .post('/api/v1/users/register')
        .send({ name: 'John', email: 'john@example.com', password: 'secret123' });

      expect(res.status).toBe(409);
      expect(res.body.success).toBe(false);
    });
  });

  describe('POST /api/v1/users/login', () => {
    it('logs in a user with valid credentials', async () => {
      const hashed = await bcrypt.hash('secret123', 10);
      userModel.findOne.mockResolvedValue({
        _id: '1',
        name: 'Jane',
        email: 'jane@example.com',
        password: hashed,
      });

      const res = await request(app)
        .post('/api/v1/users/login')
        .send({ email: 'jane@example.com', password: 'secret123' });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.user.email).toBe('jane@example.com');
    });

    it('rejects invalid credentials', async () => {
      const hashed = await bcrypt.hash('secret123', 10);
      userModel.findOne.mockResolvedValue({
        _id: '1',
        name: 'Jane',
        email: 'jane@example.com',
        password: hashed,
      });

      const res = await request(app)
        .post('/api/v1/users/login')
        .send({ email: 'jane@example.com', password: 'wrongpass' });

      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
    });
  });
});

