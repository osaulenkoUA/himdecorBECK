const express = require('express');

const { addProduct, getProducts,getProductById,validateId, updateItem, deleteItem } = require('./products.controller.js');

const productsRouter = express.Router();

productsRouter.post('/add', addProduct);
productsRouter.get('/get', getProducts);
productsRouter.get('/get-by-id',validateId,getProductById);
productsRouter.put('/update',updateItem)
productsRouter.delete('/delete',validateId,deleteItem)

module.exports = productsRouter;
