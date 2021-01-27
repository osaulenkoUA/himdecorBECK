const mongoose = require('mongoose');
const { Schema } = mongoose;

const gallerySchema = new Schema({
  title: { type: String, required: true },
  urlImage: { type: String, required: true },

});

const galleryModel = mongoose.model('Gallery', gallerySchema);

module.exports = galleryModel;
