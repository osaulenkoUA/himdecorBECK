const express = require('express');

const { addProduct, getProducts } = require('./products.controller.js');

const productsRouter = express.Router();

productsRouter.post('/add', addProduct);
productsRouter.get('/get', getProducts);

module.exports = productsRouter;
