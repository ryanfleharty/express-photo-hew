const mongoose = require("mongoose");

const photographerSchema = new mongoose.Schema({
photographer: {
        type: String,
        required: true,
        unique: true
    },
    photo: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Photo'
    }]
})

const photographer = mongoose.model('Photographer', photographerSchema);

module.exports = photographer;