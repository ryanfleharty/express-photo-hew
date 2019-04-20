const express = require('express');
const app = express();
const userController = require('./controllers/userController');
const photoController = require('./controllers/photoController');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));

require('./db/db');

app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.use('/users', userController);
app.use('/photos', photoController);

const port = 3000;
app.listen(port, () => {
    console.log(`Server is runnin' on ${port}, homes`)
})


