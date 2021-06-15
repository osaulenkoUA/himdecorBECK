const express = require('express');

const { addArticle, getArtictes,getArticteById } = require('./articles.controller.js');

const articleRouter = express.Router();

articleRouter.post('/add', addArticle);
articleRouter.get('/get', getArtictes);
articleRouter.get('/:id',getArticteById );


module.exports = articleRouter;
