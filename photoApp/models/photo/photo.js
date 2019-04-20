const mongoose = require('mongoose'); 

const photoSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    photographer: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        
    },
    url: {
        type: String,
        required: true
    }
});

const photo = mongoose.model('photo', photoSchema);

module.exports = photo;