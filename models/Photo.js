const mongoose = require('mongoose');


const photosSchema = new mongoose.Schema ({
            userName: {type: String, required: true},
            url: [{type: String, required: true}],
            photoInfo: {type: String, required: false}
});

const Photos =  mongoose.model('Photos', photosSchema);

module.exports = Photos;


