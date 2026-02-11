// Load environment variables before running tests
require('dotenv').config();

// Mock MongoDB connection to prevent actual database calls during tests
jest.mock('./src/config/database', () => ({
  __esModule: true,
  default: jest.fn(() => Promise.resolve())
}));