const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const articleRouter = require('./articles/articles.router');
const productRouter = require('./products/products.router');
const galleryRouter = require('./gallery/gallery.router');
const fileRouter = require('./file/file.router');



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
    this.server.use(express.json({ limit: '10MB' }));

    this.server.use(express.urlencoded({ extended: true }));
    this.server.use('/images', express.static('/home/alex/web/himdecor/public/images/shop'));
    this.server.use(express.raw({
      inflate: true,
      limit: '10MB',
      type: 'application/octet-stream'
    }));

    // this.server.use(bodyParser.json());
    // this.server.use(bodyParser.urlencoded({ extended: true }));
    this.server.use(cors());
  }

  initRoutes() {
    this.server.use('/articles', articleRouter);
    this.server.use('/product', productRouter);
    this.server.use('/gallery', galleryRouter);
    this.server.use('/file', fileRouter);
  }

  async initDatabase() {
    await mongoose.connect(process.env.MONGODB_URL,{ useNewUrlParser: true, useUnifiedTopology: true });
  }

  startListening() {
    try {
       this.server.listen(process.env.PORT, () => {
        console.log('Database connection successful', process.env.PORT);
      });
       this.server.timeout = 20000
    } catch (err) {
      console.log('error', err);
      process.exit(1);
    }
  }
};
