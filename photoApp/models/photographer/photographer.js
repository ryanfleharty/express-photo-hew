const mongoose = require("mongoose");

const photographerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    pasword: {
        type: String,
        required: true,
        unique: true,
    },
    photo: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'photo'
    }]
})

const photographer = mongoose.model('photographer', photographerSchema);

module.exports = photographer;