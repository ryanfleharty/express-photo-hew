// requires
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const morgan = require('morgan');

// middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(morgan('short'));

// db
require('./db/db');

// routes/controllers
const userController = require('./controllers/userController');
app.use('/users', userController);

const photoController = require('./controllers/photoController');
app.use('/photos', photoController);

// home page
app.get('/', (req,res) =>{
  res.render('home.ejs')
});

// express listening port
const port = 3000;
app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
