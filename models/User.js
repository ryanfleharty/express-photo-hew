const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: String, required: true },
  photos: [{ type: String, required: false }],
  profileImage: { type: String, required: false },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
