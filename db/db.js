const mongoose = rewuire('mongoose');

const connectionstring = 'mongodb://localhost/photo'

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
});

mongoose.connection.on('connected', () => {
    console.log(`Mongoose connected to ${connectionString}`)
});

mongoose.connection.on('disconnected', (err) => {
    console.log(`Mongoose disconnected from ${connectionString}`);
});

mongoose.connection.on('error', (err) => {
    console.log(`Mongoose error: ${err}`);
});