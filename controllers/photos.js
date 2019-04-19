const express = require('express');
const router  = express.Router();
const Photo   = require('../models/photos');

router.get('/photos', (req, res) => {
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

module.exports = router; 