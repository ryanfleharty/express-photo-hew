const express = require('express');
const router = express.Router();
const Photo = require('../models/photo');

// index route
// The home (index) page should show all of the pictures that 
// have been submitted.
router.get('/', (req, res)=> {
    Photo.find({}, (err, photo) => {
        if (err){
            res.send(err);
        } else {
            res.render('photo/index.ejs', {
                uploadedPhotos: photo
            })
        }
    })
});

// new route
router.get('/new', (req, res) => {
    Photo.findById(req.params.id, (err, newPhotoUpload) => {
        if (err){
            res.send(err);
        } else {
            res.render('photo/new.ejs')
        }    
    })
});

// create route
router.post('/', (req, res) => {
    Photo.create(req.body, (err, newPhotoUpload) => {
        if (err){
            res.send(err);
        } else {
            res.redirect('/photos')
        }  
    })
});





module.exports = router;