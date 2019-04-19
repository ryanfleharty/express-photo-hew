const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({

    userId: {type: String, required: true},
    url: {type: String, required: true, unique: true},
    description: {type: String, maxlength: 200}
    
});

const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;