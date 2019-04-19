const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 

const photoSchema = new Schema({
    photographer: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    }
});

const Photo = mongoose.model('photo', photoSchema);

module.exports = Photo;