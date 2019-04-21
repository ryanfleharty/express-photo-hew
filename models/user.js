const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    profilePhoto: String,
    photos: [{type: mongoose.Schema.Types.ObjectId, ref: 'Photo'}]
});

const User = mongoose.model('User', userSchema);
userSchema.plugin(passportLocalMongoose);

module.exports = User;