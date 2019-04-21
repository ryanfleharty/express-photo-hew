const express             = require('express');
const mongoose            = require('mongoose');
const bodyParser          = require('body-parser');
const methodOverride      = require('method-override');
const multer              = require('multer');
const cloudinary          = require('cloudinary');
const cloudinaryStorage   = require('multer-storage-cloudinary')
const userController      = require('./controllers/userController');
const photoController     = require('./controllers/photoController');
const app                 = express()
require('./db/db.js')

app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use('/users', userController);
app.use('/photos', photoController);
app.use(express.static('public'))


app.get('/', (req, res)=>{
    res.render("index.ejs");
})




app.listen(3000, ()=>{
    console.log("server is go");
})
