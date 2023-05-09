const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;
const mongourl = require('./private/mongo');

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/blog', (req, res) => {
  res.send('Hello Blog!');
});

mongoose
  .connect(mongourl)
  .then(() => {
    console.log('Connected to MongoDB');

    app.listen(port, () => {
      console.log(`Node-API app is running on port ${port}!`);
    });
  })
  .catch((error) => {
    console.log(`Failed to connect to MongoDB: ${error}`);
  });

// TODO: Video: https://www.youtube.com/watch?v=9OfL9H6AmhQ
// TODO: Time: 11:29
