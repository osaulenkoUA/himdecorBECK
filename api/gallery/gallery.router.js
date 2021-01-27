const express = require('express');

const { addGallery, getGallery } = require('./gallery.controller.js');

const articleRouter = express.Router();

articleRouter.post('/add', addGallery);
articleRouter.get('/get', getGallery);
// articleRouter.delete('/delete/:id', validateId, deleteContact);

module.exports = articleRouter;
