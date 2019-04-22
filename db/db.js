//DB Requires
const mongoose = require('mongoose');
const PhotoModel = require('../models/photos');
const UserModel = require('../models/users');
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



//PHOTO BASE POPULATION
// const photoData = require('../populatePhotos');

// PhotoModel.collection.insertMany(photoData, (err, data) => {
//     console.log('added data');
//     mongoose.connection.close(); 
// });


//USERS BASE POPULATION
// const usersData = require('../populateUsers');

// UserModel.collection.insertMany(usersData, (err, data) => {
//     console.log('added user data');
//     console.log(data);
//     mongoose.connection.close();
// });