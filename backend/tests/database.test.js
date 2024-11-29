const mongoose = require('mongoose');
require('dotenv').config();
const connectDB = require('../config/db');

describe('Database Tests', () => {
  // increase timeout for long-running tests
  jest.setTimeout(10000);
  beforeAll(async () => {
    await connectDB();
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });


  // successful connection test
  describe('Database Connection', () => {
    test('should connect to the database successfully', () => {
      expect(mongoose.connection.readyState).toBe(1);
    });
  });

  // connection failure test
  describe('Database Connection Failure', () => {
    test('should fail to connect with an invalid URI', async () => {
      const invalidURI = 'mongodb://invalid-uri';
      await expect(mongoose.connect(invalidURI)).rejects.toThrow();
    });
  });

  // disconnection test
  describe('Database Disconnection', () => {
    test('should disconnect from the database successfully', async () => {
      await mongoose.disconnect();
      expect(mongoose.connection.readyState).toBe(0); // 0 means disconnected
    });
  });
});
