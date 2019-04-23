const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const morgan = require('morgan');
const passport = require('passport');
const passportLocal = require('passport-local');
const passportLocalMongoose = require('passport-local-mongoose');
const photoController = require('./controllers/photoController');
const userController = require('./controllers/userController');
require('./db/db');


app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(morgan('short'));
app.use(express.static('public'));
app.use('/photos', photoController);
app.use('/users', userController);
app.use(require('express-session')({
    secret: 'Hello world, this is a session',
    resave: false,
    saveUninitialized: false
}));



app.get('/', (req, res) => {
    res.render('index.ejs');
})

const port = 3000;
app.listen(port, () => {
    console.log('Server is listening');
});