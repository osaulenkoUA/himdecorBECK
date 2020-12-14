const mongoose = require('mongoose');
const { Schema } = mongoose;

const articleSchema = new Schema({
  title: { type: String, required: true },
  article: { type: String, required: true },
  urlImage: { type: String, required: true },

});

const articleModel = mongoose.model('Article', articleSchema);

module.exports = articleModel;
