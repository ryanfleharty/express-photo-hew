const mongoose = require('mongoose'); 

const userSchema = new mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true, unique: true},
    photos: [{type: mongoose.Schema.Types.ObjectId, ref: 'photos'}]
});

const User = mongoose.model('User', userSchema);

module.exports = User;