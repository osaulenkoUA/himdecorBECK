const express = require('express');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

const { addFile,deleteFile } = require('./file.controller.js');

const fileRouter = express.Router();

fileRouter.post('/uploadFile',upload.array('pictures',5),  addFile);
fileRouter.post('/deleteFile', deleteFile);

module.exports = fileRouter;
