//REQUIRES
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const photosController = require('./controllers/photos');
const userController = require('./controllers/users');
require('./db/db');


//MIDDLEWARE
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use('/photos', photosController);
app.use('/users', userController);

app.use(express.static('public'));

//PORT
const port = 3000;
app.listen(port, () => {
    console.log('listening on port 3000');
})


