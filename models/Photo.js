//When creating a schema for Photo, think about validations. 
//What do you want to be required (the URL? a title? some sort of name for the user?).
const mongoose = require("mongoose");

const photoSchema = new mongoose.Schema({
    username: {type: String, required: true},
    url: {type: String, required: true},
    title: String

})

const Photo = mongoose.model('Photo', photoSchema);
//the result of this function is the model based on the above schema (or blueprint)
//creating a 'photos' collection

module.exports = Photo;
//exporting my Photo model to be used elsewhere