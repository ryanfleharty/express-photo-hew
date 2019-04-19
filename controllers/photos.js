const express = require('express');
const router = express.Router();
const Photo = require('../models/photos');

//console.log(Photo);
// INDEX ROUTE
router.get('/', (req, res) => {
    Photo.find({}, (error, returnedPhotos) => {
        if(error){
            console.log(error);
        } else {
            res.render('index.ejs', {
                allPhotos: returnedPhotos
            })
        }
    })
});

// NEW ROUTE
router.get('/new', (req, res) => {
    res.render('new.ejs')
});

// CREATE ROUTE
router.post('/', (req, res) => {
    Photo.create(req.body, (error, newPhoto) => {
        if (error){
            console.log(error)
        } else {
            console.log(newPhoto);
            res.redirect('/photos')
        }
    })
});

// DELETE ROUTE
router.delete('/:id', (req, res) => {
    Photo.findByIdAndDelete(req.params.id, (error, deletedPhoto) => {
        if(error){
            console.log(error);
        } else {
            console.log(deletedPhoto);
            res.redirect('/photos');
        }
    })
})

// EDIT ROUTE

// UPDATE ROUTE

// SHOW ROUTE





module.exports = router;