const request = require('supertest');
const bcrypt = require('bcrypt');
const express = require('express');
const userRoutes = require('./path/to/your/router/file'); // Update the path

// Mock User model and bcrypt inside your test file
const mockUser = {
  id_use: '12345',
  password: '$2b$10$examplehashedpassword',
};

const app = express();
app.use(express.json()); // Body parser
app.use('/', userRoutes);

describe('POST /user', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return 404 for a non-existent user', async () => {
    mockFindOne.mockResolvedValue(null);
    const res = await request(app)
      .post('/user')
      .send({ id_use: 'nonexistent', password: 'password' });
    expect(res.statusCode).toEqual(404);
    expect(res.body).toEqual({ success: false, message: 'User not found' });
  });

  it('should authenticate a user successfully', async () => {
    mockFindOne.mockResolvedValue(mockUser);
    bcrypt.compare.mockResolvedValue(true);
    const res = await request(app)
      .post('/user')
      .send({ id_use: mockUser.id_use, password: 'correctPassword' });
    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toEqual(true);
    expect(bcrypt.compare).toHaveBeenCalledWith('correctPassword', mockUser.password);
  });

  it('should return 401 for incorrect password', async () => {
    mockFindOne.mockResolvedValue(mockUser);
    bcrypt.compare.mockResolvedValue(false);
    const res = await request(app)
      .post('/user')
      .send({ id_use: mockUser.id_use, password: 'wrongPassword' });
    expect(res.statusCode).toEqual(401);
    expect(res.body).toEqual({ success: false, message: 'Incorrect password' });
  });

  // Test rate limiting
  it('should rate limit excessive requests', async () => {
    for (let i = 0; i < 5; i++) {
      await request(app).post('/user').send({ id_use: mockUser.id_use, password: 'password' });
    }
    const res = await request(app)
      .post('/user')
      .send({ id_use: mockUser.id_use, password: 'password' });
    expect(res.statusCode).toEqual(429);
    expect(res.body).toEqual({ message: 'Too many login attempts from this IP, please try again later' });
  });
});
