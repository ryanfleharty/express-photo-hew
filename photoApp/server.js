const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override')

require('./db/db');

const photoController = require('./controllers/photo');

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(methodOverride('_method'))

app.use('/photo', photoController);


app.listen(3000, () => {
    console.log('app listening on port: ', 3000);
});
