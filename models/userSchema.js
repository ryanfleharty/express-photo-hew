const mongoose = require('mongoose')
const Schema   = mongoose.Schema

const userSchema = new Schema({

  name:{type: String, required: true} ,
  description: String,
  relationshipStatus: String,
  profilePicture: String,
  photos: [{type: Schema.Types.ObjectId, ref: 'Photo'}]

})

const User = mongoose.model('User', userSchema);

module.exports = User
