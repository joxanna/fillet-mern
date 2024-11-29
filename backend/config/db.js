const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    // exit the process only in non-test environments
    if (process.env.NODE_ENV !== 'test') {
      process.exit(1);
    } else {
      throw error; // throw error to allow test to handle it
    }
  }
};

module.exports = connectDB;
