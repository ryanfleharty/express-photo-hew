const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
    title: {type: String, required: true},
    url: String,
    caption: String,
    date: {type: Date, required: true}
});

const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;