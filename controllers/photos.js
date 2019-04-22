const express = require('express');
const router = express.Router();
const Photo = require('../models/photos/Photo');

// SHOW INDEX
router.get('/', (req, res) => {
    // res.send('hi i am here!!!');
    Photo.find({}, (err, foundAllPhotos) => {
        if(err){
            console.log(err);
            res.send(err);
        } else {
            console.log(foundAllPhotos);
            res.render('photos/index.ejs', {photo: foundAllPhotos});
        }
    })
})

// NEW PHOTO

router.post('/', (req, res) => {
    Photo.create(req.body, (err, newPhoto) => {
        if(err){
            console.log(err);
            res.send(err);
        } else {
            console.log(newPhoto);
            res.redirect('/photos');
        }
    })
})


router.get('/new', (req, res) => {
    res.render('photos/new.ejs');
})

// DELETE

router.delete('/:id', (req, res) => {
    Photo.findByIdAndDelete(req.params.id, (err, deletedPhoto) => {
        if(err){
            console.log(err);
            res.send(err);
        } else {
            console.log(deletedPhoto);
            res.redirect('/photos');
        }
    })
})


// EDIT PHOTO

router.put('/:id', (req, res) => {
    Photo.findByIdAndUpdate(req.params.id, req.body, (err, updatePhoto) => {
        if(err){
            console.log(err);
            res.send(err);
        } else {
            res.redirect('/photos')
        }
    })
})


router.get('/:id/edit', (req, res) => {
    Photo.findById(req.params.id, (err, foundPhoto) => {
        if(err){
            console.log(err);
            res.send(err);
        } else {
            res.render('photos/edit.ejs', {photo: foundPhoto});
        }
    })
});

//SHOW JUST ONE

router.get('/:id', (req, res) => {
    Photo.findById(req.params.id, (err, foundPhoto) => {
        if(err){
            console.log(err);
            res.send(err);
        } else {
            console.log(foundPhoto);
            res.render('photos/show.ejs', {photo: foundPhoto});
        }
    })
})


module.exports = router;