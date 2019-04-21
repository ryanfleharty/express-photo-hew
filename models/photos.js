const mongoose = require('mongoose');

const photoSchema = mongoose.Schema({
  url: {type: String, required: true},
  title: {type: String, required: true}
});

const Photos = mongoose.model('Photos', photoSchema);

module.exports = {
  photoSchema,
  Photos
};