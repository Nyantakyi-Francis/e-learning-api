require('dotenv').config();
const request = require('supertest');
const app = require('../app');

// Note: These tests will attempt to connect to MongoDB
// Make sure your MongoDB is running or use a test database

describe('User API Endpoints', () => {
  describe('GET /api/users/:id', () => {
    it('should return 400 for invalid ID format', async () => {
      const res = await request(app).get('/api/users/invalid123');
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('success', false);
      expect(res.body.message).toContain('Invalid');
    });
  });
});