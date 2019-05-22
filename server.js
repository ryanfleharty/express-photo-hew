const express = require('express');
const app = express();
const photoController = require('./controllers/photoController');
const userController = require('./controllers/userController');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const morgan = require('morgan');
require('./db/db');




app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(morgan('short'));
app.get('/', (req, res)=>{
    res.render("index.ejs");
})


app.use('/photo', photoController);
app.use('/user', userController);




app.listen(3000, ()=>{
    console.log("server is running");
})