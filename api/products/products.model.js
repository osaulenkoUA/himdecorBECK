const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
  group: { type: String, required: true },
  name: { type: String, required: true },
  fasovka: { type: Array, required: false },
  sklad: { type: String, required: false },
  time: { type: String, required: false },
  vutratu: { type: String, required: false },
  solvent: { type: String, required: false },
  vudurobit: { type: String, required: false },
  vlastuvosti: { type: String, required: false },
  pidgotovka: { type: String, required: false },
  nanesennya: { type: String, required: false },
  urlimage: { type: String, required: false },
  buyurl: { type: String, required: false },
  matchurl: { type: String, required: false },

});

const productModel = mongoose.model('Product', productSchema);

module.exports = productModel;
