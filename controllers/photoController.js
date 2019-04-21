const express = require('express');
const router = express.Router();
const Photo = require('../models/photoModel');
const User = require('../models/userModel');

// INDEX ROUTE
router.get('/', (req, res)=>{
    Photo.find({}, (err, allPhotos) => {
        if(err){
            res.send(err)
        }else{
            res.render('photos/index.ejs', {photo: allPhotos})
        }
    })
});

// NEW ROUTE
router.get('/new', (req, res) => {
    res.render('photos/new.ejs')
});

// SHOW ROUTE
router.get('/:id', (req, res) => {
    Photo.findById(req.params.id, (err, onePhoto) => {
        if(err){
            res.send(err)
        }else{
            res.render('photos/show.ejs', {
                photo: onePhoto
            })
        }
    })
})


// EDIT ROUTE
router.get('/:id/edit', (req, res) => {
    Photo.findById(req.params.id, (err, editPhoto) => {
        if(err){
            console.log(err)
        }else{
            console.log(editPhoto),
            res.render('photos/edit.ejs', {photo: editPhoto})
        }
    })
    
});


// CREATE ROUTE
router.post('/', (req, res) => {
    Photo.create(req.body, (err, newPhoto) => {
        if(err){
            res.send(err)
        }else{
            res.redirect('/photos')
        }
    })
})


// UPDATE ROUTE
router.put('/', (req, res) => {
    Photo.findByIdAndUpdate(req.params.id, req.body, (err, updatedPhoto) => {
        if(err){
            res.send(err)
        }else{
            res.redirect('/photos', {photo: updatedPhoto})
        }
    })
})

// DELETE ROUTE
router.delete('/:id', (req, res) => {
    Photo.findByIdAndDelete(req.params.id, (err, deletedPhoto) => {
        if(err){
            console.log(err)
        }else{
            res.redirect('/photos')
        }
    })
});


module.exports = router;