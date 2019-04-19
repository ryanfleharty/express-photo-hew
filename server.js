require('./db/db')
const express = require('express');
const app = express();
const mongoose = require('mongoose')
const router = require('./controllers/users/user');


//Middleware:
app.use('/photoapp',router);

//Render the homepage:
app.get('/', (req, res) => {
    res.render('./users/home.ejs')
});





app.listen(3000, () => {
    console.log('server is listening on port 3000')
});