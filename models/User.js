const mongoose = require('mongoose');
const Photo = require('./Photo');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: String, required: true },
  photos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Photo' }],
  profileImage: { type: String, required: false },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
