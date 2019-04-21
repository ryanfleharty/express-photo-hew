const mongoose = require('mongoose')
const Schema   = mongoose.Schema

const photoSchema = new Schema({

  url: {type: String, required: true},
  caption: String,
  location: String,
  datePosted: Date,
  likes: Number,

})

const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo
