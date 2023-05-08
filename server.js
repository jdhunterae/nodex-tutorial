const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Node-API app is running on port ${port}!`);
});

// TODO: Video: https://www.youtube.com/watch?v=9OfL9H6AmhQ
// TODO: Time: 11:29
