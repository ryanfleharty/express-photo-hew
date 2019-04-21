const mongoose = require('mongoose');



const photoSchema = new mongoose.Schema({
    photo: String,
    caption: String
})

const Photo = mongoose.model('Photo', photoSchema);
module.exports = Photo;