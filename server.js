const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;
const mongourl = require('./private/mongo');
const Product = require('./models/product');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ROUTES

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/blog', (req, res) => {
  res.send('Hello Blog!');
});

app.get('/products', async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

app.get('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

app.delete('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: `Product "${id}" not found` });
    }
    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

app.post('/products', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

app.put('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);
    if (!product) {
      return res.status(404).json({ message: `Product "${id}" not found` });
    }
    const updatedProduct = await Product.findById(id);
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// SERVER STARTUP

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
