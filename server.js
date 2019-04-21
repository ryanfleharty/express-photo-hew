const express = require('express');
const app = express();
//controller here
//controller here
const methodOverride = require('method-override');
const bodyParser = require('body-parser');



app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
require('./db/db');

//need these later
// app.get('/', (req, res)=>{
//     res.render("index.ejs");
// })

// app.use('/users', userController);
// app.use('/cats', catsController);



app.listen(3000, ()=>{
    console.log("server is running");
})