const express = require('express');
const router = express.Router();
const Photo = require('../models/Photo');


//index route- show all the photos
router.get('/' , (req, res) => {
    Photo.find({}, (err, foundUsernames) => {
        if(err){
            res.send(err)
        }else{
            res.render('photo/index.ejs', {
                username: foundUsernames
        })
    }
});

});
//new route
router.get('/new', (req, res) =>{
    res.render('photo/new.ejs');
});

//create route
router.post('/', (req, res) => {
    console.log(req.body);
    Photo.create(req.body, (err, createdPhoto) =>{
        if(err){
            res.send(err);
        }else{ 
            res.send('/photo');
        }
    })
});













module.exports = router;