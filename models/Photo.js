const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  topic: { type: String, required: true },
  published: Boolean,
  img: { type: String, required: true },
});

const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;
