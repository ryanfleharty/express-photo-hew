const mongoose = require('mongoose');

const photoSchema = mongoose.Schema({
  title:String,
  body:String
});

const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;
