const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const articleRouter = require('./articles/articles.router');
const productRouter = require('./products/products.router');
const galleryRouter = require('./gallery/gallery.router');



mongoose.set('debug', true);

module.exports = class HimdecorServer {
  constructor() {
    this.server = null;
  }

  async start() {
    this.initServer();
    this.initMiddlewares();
    this.initRoutes();
    await this.initDatabase();
    return this.startListening();
  }

  initServer() {
    this.server = express();
  }
  initMiddlewares() {
    this.server.use(express.json());

    this.server.use(express.urlencoded({ extended: true }));


    this.server.use(cors());
  }

  initRoutes() {
    this.server.use('/articles', articleRouter);
    this.server.use('/product', productRouter);
    this.server.use('/gallery', galleryRouter);
  }

  async initDatabase() {
    await mongoose.connect(process.env.MONGODB_URL);
  }

  startListening() {
    try {
      return this.server.listen(process.env.PORT, () => {
        console.log('Database connection successful', process.env.PORT);
      });
    } catch (err) {
      console.log('error', err);
      process.exit(1);
    }
  }
};
