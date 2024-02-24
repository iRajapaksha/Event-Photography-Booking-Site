const config = require('./config')
const express = require('express')
const mongoose = require('mongoose')
const port = config.PORT ;
const app = require('./app')

// Replace with your actual MongoDB URI
const dbURI = 'mongodb://127.0.0.1:27017/BookMyShootwebapp';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
  // Start your application logic here
  app.listen(port,()=>{
      console.log(`Example app listening on port ${port}`);
  })
});
