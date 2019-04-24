const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: String, required: true },
  photos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Photo' }],
  profileImage: { type: String, required: false },
});

userSchema.index({ name: 'text' });

const User = mongoose.model('User', userSchema);

module.exports = User;
