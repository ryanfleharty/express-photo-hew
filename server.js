const express        = require('express');
const app            = express();
const bodyParser     = require('body-parser');
const methodOverride = require('method-override');
require('./db/db')
const Photos = require('./controllers/photos');
const Users = require('./controllers/users');


app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use('/photos', Photos);
app.use('/users', Users);


app.listen(3000, () => {
  console.log('listening... on port: ', 3000);
});
