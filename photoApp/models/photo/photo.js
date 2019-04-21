const mongoose = require('mongoose'); 

const photoSchema = new mongoose.Schema({
    subject: {
        type: String,
    },
    photographer: {
        type: String,
        required: true
    },
    description: {
        type: String,
        
    },
    url: {
        type: String,
        required: true
    }
});

const photo = mongoose.model('photo', photoSchema);

module.exports = photo;