const mongoose = require('mongoose');
const express = require('express');
const app = express();
const photographer = require('./controllers/photographer');
const photo = require('./controllers/photo');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const Photographer = require('./models/photographer/photographer')

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(methodOverride('_method'));
require('./db/db');

app.get('/', (req, res) => {
    res.render("index.ejs");
})


// Photographer.collection.insertMany([{
//     name: 'John',
//     photo: [],
//       password: "brother"
// },{
//     name: 'dave',
//     photo: [],
//      password: "me"
// }]
// , (err, data) => {
//     console.log("added provided data")
//     mongoose.connection.close();
// });


app.use('/photographer', photographer);
app.use('/photo', photo);

app.listen(3000, () => {
    console.log("server is go");
})