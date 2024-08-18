// models/fileModel.js

const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  filename: String,
  path: String,
  size: Number,
});

module.exports = mongoose.model('File', fileSchema);
