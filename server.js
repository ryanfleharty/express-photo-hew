const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const morgan = require('morgan')
const port = 3000;
const app = express();






app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(morgan('short'));

require('./db/db');
const photosController = require('./controllers/photosController');
app.use('/photos', photosController);

app.get('/', (req,res) =>{
    res.render('index.ejs')
})



app.listen(port, () => {
    console.log(`App listening on port: ${port}`)
})


