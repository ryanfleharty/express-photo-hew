const express = require('express');
const app = express();
const photographer = require('./controllers/photographer');
const photo = require('./controllers/photo');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(methodOverride('_method'));
require('./db/db');

app.get('/', (req, res) => {
    res.render("index.ejs");
})

app.use('/photographer', photographer);
app.use('/photo', photo);

app.listen(3000, () => {
    console.log("server is go");
})