//DB Requires
const mongoose = require('mongoose');
const PhotoModel = require('../models/photos');
const connectionString = 'mongodb://localhost/photos';

//DB Middleware
mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
});


mongoose.connection.on('connected', () => {
    console.log(`Mongoose connected to ${connectionString}`);
});

mongoose.connection.on('error', (error) => {
    console.log(`Mongoose connection error ${error}`);
});

mongoose.connection.on('disconnected', () => {
    console.log(`Mongoose disconnected from ${connectionString}`);
});


// const photoData = require('../populatePhotos');

// PhotoModel.collection.insertMany(photoData, (err, data) => {
//     console.log('added data');
//     mongoose.connection.close(); 
// });

