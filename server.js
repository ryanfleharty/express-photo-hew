require('./db/db')
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userController = require('./controllers/users/userController');
const User = require('./models/users/userSchema');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');


//Middleware:

app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use('/users',userController);

//Render the homepage:
// app.get('/', (req, res) => {
//     res.render('./users/home.ejs')
// });





app.listen(3000, () => {
    console.log('server is listening on port 3000')
});