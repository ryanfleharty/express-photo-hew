const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    profilePhoto: String,
    photos: [{type: mongoose.Schema.Types.ObjectId, ref: 'Photos'}]
});
const Users = mongoose.model('Users', userSchema);

module.exports = Users