const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'EduAPI - E-Learning Platform API',
      version: '2.0.0',
      description: 'A comprehensive API for managing an e-learning platform with users, courses, lessons, enrollments, and reviews. Features include OAuth authentication, data validation, and role-based access control.',
      contact: {
        name: 'Nyantakyi Francis & Edem Essien Offiong',
        email: 'support@eduapi.com'
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT'
      }
    },
    servers: [
      {
        url: 'https://eduapi-platform.onrender.com',
        description: 'Production server (Default)'
      },
      {
        url: 'http://localhost:3000',
        description: 'Development server'
      }
    ],
    tags: [
      {
        name: 'Authentication',
        description: 'OAuth authentication endpoints'
      },
      {
        name: 'Users',
        description: 'User management endpoints'
      },
      {
        name: 'Courses',
        description: 'Course management endpoints'
      },
      {
        name: 'Lessons',
        description: 'Lesson management endpoints'
      },
      {
        name: 'Enrollments',
        description: 'Enrollment management endpoints'
      }
    ]
  },
  apis: ['./src/routes/*.js'] // Path to the API routes
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = { swaggerUi, swaggerSpec };