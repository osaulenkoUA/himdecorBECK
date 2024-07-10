const mongoose = require('mongoose');
const { Schema } = mongoose;

const fileSchema = new Schema({
  file: { type: String, required: true },
  fileName: { type: String, required: true },
  targetDir: { type: String, required: true },
  });

const fileModel = mongoose.model('File', fileSchema);

module.exports = fileModel;
