const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'EduAPI - E-Learning Platform API',
      version: '1.0.0',
      description: 'A comprehensive API for managing an e-learning platform with users, courses, lessons, enrollments, and reviews.',
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
    url: 'http://localhost:3000',
    description: 'Development server'
  },
  {
    url: 'https://eduapi-platform.onrender.com',
    description: 'Production server'
  }
],
    tags: [
      {
        name: 'Users',
        description: 'User management endpoints'
      },
      {
        name: 'Courses',
        description: 'Course management endpoints'
      }
    ]
  },
  apis: ['./src/routes/*.js'] // Path to the API routes
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = { swaggerUi, swaggerSpec };