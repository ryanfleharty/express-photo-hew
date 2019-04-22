const mongoose = require('mongoose');


const connectionString = 'mongodb://localhost/photoBlogBoi';

// THis is actually connecting to mongodb server that is running
// on another port on our computer
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});

mongoose.connection.on('connected', () => {
  console.log(`Mogoose connected to ${connectionString}`);
});

mongoose.connection.on('disconnected', () => {
  console.log(`Mogoose disconnected from ${connectionString}`);
});

mongoose.connection.on('error', (err) => {
  console.log(`Mogoose error: ${err}`);
});

