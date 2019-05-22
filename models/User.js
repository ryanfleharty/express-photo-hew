//When creating a schema for Photo, think about validations. 
//What do you want to be required (the URL? a title? some sort of name for the user?).
const mongoose = require("mongoose");
const Photo = require('./Photo');

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    photo: [Photo.schema]
})

const User = mongoose.model('User', userSchema);
//the result of this function is the model based on the above schema (or blueprint)
//creating a 'photos' collection

module.exports = User;
