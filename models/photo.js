const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
    url: {type: String, required: true,},
    username: {type: String, required: true,},
    title: String,
    description: String,
});

const Photo = mongoose.model('Photo', photoSchema);
module.exports = Photo;