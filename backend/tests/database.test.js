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

  it('should connect to the database successfully', () => {
    expect(mongoose.connection.readyState).toBe(1);
  });

  it('should fail to connect with an invalid URI', async () => {
    const invalidURI = 'mongodb://invalid-uri';
    await expect(mongoose.connect(invalidURI)).rejects.toThrow();
  });

  it('should disconnect from the database successfully', async () => {
    await mongoose.disconnect();
    expect(mongoose.connection.readyState).toBe(0);
  });
});
