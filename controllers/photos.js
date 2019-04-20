const express = require('express');
const router = express.Router();
const Photo = require('../models/photos');
const User = require('../models/users');


// ROUTES 

// INDEX ROUTE
router.get('/', (req, res) => {
    Photo.find({}, (error, returnedPhotos) => {
        if(error){
            console.log(error);
        } else {
            res.render('photos/index.ejs', {
                allPhotos: returnedPhotos
            })
        }
    })
});

// NEW ROUTE
router.get('/new', (req, res) => {
    res.render('photos/new.ejs')
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
});

// EDIT ROUTE
router.get('/:id/edit', (req, res) => {
    Photo.findById(req.params.id, (error, foundPhoto) =>{
        if(error){
            console.log(error);
        } else {
            res.render('photos/edit.ejs', {
                photo: foundPhoto,
                id: req.params.id
            })
        }
    })
});

// UPDATE ROUTE
router.put('/:id', (req, res) => {
    Photo.findOneAndUpdate({_id: req.params.id}, req.body, (error, foundPhoto) => {
        if(error) {
            console.log(error);
        } else {
            foundPhoto = req.body;
            res.redirect('/photos');
            console.log(foundPhoto);
        }
    })
})


// SHOW ROUTE
router.get('/:id', (req, res) => {
    Photo.findById(req.params.id, (error, foundPhoto) =>{
        if(error){
            console.log(error)
        } else {
            res.render('photos/show.ejs', {
                photo: foundPhoto,
                id: req.params.id
            })
        }
    })
})




module.exports = router;