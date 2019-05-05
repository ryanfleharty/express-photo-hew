const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const photoSchema = mongoose.Schema({
  url: {type: String, required: true},
  title: {type: String, required: true},
  description: String
});

const Photos = mongoose.model('Photos', photoSchema);

module.exports = Photos