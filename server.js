const express = require('express');
const app = express();
const photoController = require('./controllers/photoController');
//controller here
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
require('./db/db');




app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));



app.use('/photo', photoController);




app.listen(3000, ()=>{
    console.log("server is running");
})