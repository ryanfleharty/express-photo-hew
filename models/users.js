const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true}, 
    photos: [{type: mongoose.Schema.Types.ObjectId, ref: 'Photo'}],
    bio: String,
    img: {type: String, default: 'https://www.bookmydesign.com/auth-image/medium/blank-user.png?resize=202%2C60'}
});

const User = mongoose.model('User', userSchema);

module.exports = User;