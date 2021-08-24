const express = require('express');

const { addProduct, getProducts,getProductById,validateId } = require('./products.controller.js');

const productsRouter = express.Router();

productsRouter.post('/add', addProduct);
productsRouter.get('/get', getProducts);
productsRouter.get('/:id',validateId,getProductById);


module.exports = productsRouter;
