const express = require('express');

const { addArticle, getArtictes } = require('./articles.controller.js');

const articleRouter = express.Router();

articleRouter.post('/add', addArticle);
articleRouter.get('/get', getArtictes);
// articleRouter.delete('/delete/:id', validateId, deleteContact);

module.exports = articleRouter;
