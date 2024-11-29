// import express
const express = require("express")

// get environment variables
require('dotenv').config()

const environment = process.env.NODE_ENV || 'development';
console.log(`App running in ${environment} mode`);

// import connection from db.js
const connectDB = require('./config/db');
const port = process.env.PORT || 3030;

const app = express()

// connect to db
connectDB()

// middleware
app.use(express.json());

// routes
app.get('/', (req, res) => {
  res.send('API is running...');
});

// start server code
app.listenport,async()=>{
  console.log("Server is running on port number:", port)
};