require('dotenv').config();
const request = require('supertest');
const app = require('../app');

describe('Course API Endpoints', () => {
  describe('GET /api/courses/:id', () => {
    it('should return 400 for invalid ID format', async () => {
      const res = await request(app).get('/api/courses/invalid456');
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('success', false);
      expect(res.body.message).toContain('Invalid');
    });
  });
});