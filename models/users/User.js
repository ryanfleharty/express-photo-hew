const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {type: String, required: true},
    photos: [{type: mongoose.Schema.ObjectId, ref: 'Photo'}]
});

const User = mongoose.model('User', userSchema);

module.exports = User;