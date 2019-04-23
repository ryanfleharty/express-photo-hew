const express         = require('express');
const app             = express();
const photoController = require('./controllers/photos');

const bodyParser      = require('body-parser');
const methodOverride  = require('method-override');
const morgan          = require('morgan');

require('./db/db');

app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended: false}));
app.use('/photos', photoController);


// Possibly how I make / get to the homepage

// app.get('/', (req, res) => {
//     res.render('index.ejs')
// });

app.listen(3000, () => {
    console.log('app is listening on port: ', 3000)
});