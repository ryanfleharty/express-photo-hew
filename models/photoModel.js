const mongoose = require('mongoose');

const photoSchema = mongoose.Schema({
  title:String,
  caption: String,
  date: Date
});

const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;
