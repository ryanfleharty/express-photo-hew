//REQUIRES
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const photosController = require('./controllers/photos');
require('./db/db');


//MIDDLEWARE
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use('/photos', photosController);



app.listen(3000, () => {
    console.log('listening on port 3000');
})


