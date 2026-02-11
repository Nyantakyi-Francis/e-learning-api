require('dotenv').config();
const request = require('supertest');
const app = require('../app');

describe('Lesson API Endpoints', () => {
  describe('GET /api/lessons/:id', () => {
    it('should return 400 for invalid ID format', async () => {
      const res = await request(app).get('/api/lessons/invalidLessonId');
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('success', false);
      expect(res.body.message).toContain('Invalid');
    });
  });

  describe('GET /api/lessons/course/:courseId', () => {
    it('should return 400 for invalid course ID format', async () => {
      const res = await request(app).get('/api/lessons/course/invalidCourseId');
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('success', false);
    });
  });
});