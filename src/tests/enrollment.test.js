require('dotenv').config();
const request = require('supertest');
const app = require('../app');

describe('Enrollment API Endpoints', () => {
  describe('GET /api/enrollments/:id', () => {
    it('should return 400 for invalid ID format', async () => {
      const res = await request(app).get('/api/enrollments/invalidEnrollmentId');
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('success', false);
      expect(res.body.message).toContain('Invalid');
    });
  });

  describe('GET /api/enrollments/user/:userId', () => {
    it('should return 400 for invalid user ID format', async () => {
      const res = await request(app).get('/api/enrollments/user/invalidUserId');
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('success', false);
    });
  });

  describe('GET /api/enrollments/course/:courseId', () => {
    it('should return 400 for invalid course ID format', async () => {
      const res = await request(app).get('/api/enrollments/course/invalidCourseId');
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('success', false);
    });
  });
});