const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  topic: { type: String, required: true },
  uploadDate: { type: Date, required: false },
  img: { type: String, required: true },
});

const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;
