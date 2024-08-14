const express = require('express');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

const { addFile } = require('./file.controller.js');

const fileRouter = express.Router();

fileRouter.post('/uploadFile',upload.single('file'),  addFile);

module.exports = fileRouter;
