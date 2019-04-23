const express = require('express');
const router  = express.Router();
const Photo   = require('../models/photos');



// NEW ROUTE
router.get('/new', (req, res) => {
    res.render('new.ejs');
});

// INDEX ROUTE 
router.get('/', (req, res) => {
    Photo.find({}, (err, allPhotos)=>{
        if(err){
            console.log(err)
            res.send(err)
        } else {
            console.log(allPhotos)
            res.render('index.ejs');
        }
    })
});

// CREATE ROUTE
router.post('/', (req, res) => {
    Photo.create(req.body, (err, madePhoto) =>{
        if(err){
            console.log(err); 
            res.send(err);
        } else {
            console.log (madePhoto);
            res.redirect('/photos')
        }
    })
});



module.exports = router; 