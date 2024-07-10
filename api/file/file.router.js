const express = require('express');

const { addFile } = require('./file.controller.js');

const fileRouter = express.Router();

fileRouter.post('/uploadFile', addFile);

module.exports = fileRouter;
