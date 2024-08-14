const mongoose = require('mongoose');
const { Schema } = mongoose;

const fileSchema = new Schema({
  file: { type: String, required: false },
  fileName: { type: String, required: false },
  targetDir: { type: String, required: false },
  });

const fileModel = mongoose.model('File', fileSchema);

module.exports = fileModel;
