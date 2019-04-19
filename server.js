const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const morgan = require('morgan');
const photoController = require('./controllers/photoController');
//user controller
require('./db/db');


app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(morgan('short'));
app.use(express.static('public'));
app.use('/photos', photoController);
// use user controller

const port = 3000;
app.listen(port, () => {
    console.log('Server is listening');
});