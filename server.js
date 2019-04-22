require('./db/db');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;
const photoController = require('./controllers/photos');
const userController = require('./controllers/users');

const methodOverride = require('method-override');
const bodyParser = require('body-parser');

app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended: true}));
app.use('/photos', photoController);
app.use('/users', userController);


app.get('/', (req, res) => {
    res.render('index.ejs');
})

app.listen(port, () => {
    console.log(`app listening on port ${port}`);
})