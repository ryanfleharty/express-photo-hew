const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({

    img: {type: String, required: true},
    description: String,
    
});

const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;