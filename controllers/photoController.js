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
            res.render('photos/index.ejs')
        }
    })
});

// SHOW ROUTE
router.get('/:id', (req, res) => {
    Photo.findById(req.params.id, (err, onePhoto) => {
        if(err){
            res.send(err)
        }else{
            res.render('photos/:id/show.ejs')
        }
    })
})

// NEW ROUTE
router.get('/new', (req, res) => {
    res.render('photos/new.ejs')
});

// CREATE ROUTE
router.post('/', (req, res) => {
    Photo.create(req.body, (err, newPhoto) => {
        if(err){
            res.send(err)
        }else{
            res.redirect('photos/index.ejs', {photo: newPhoto})
        }
    })
})

// EDIT ROUTE
router.get('/:id/edit', (req, res) => {
    res.render('photos/:id/edit.ejs', {photo: Photo})
});

// UPDATE ROUTE
router.put('/', (req, res) => {
    Photo.findByIdAndUpdate(req.params.id, req.body, (err, updatedPhoto) => {
        if(err){
            res.send(err)
        }else{
            res.redirect('photos/index.ejs', {photo: updatedPhoto})
        }
    })
})

// DELETE ROUTE
router.delete('/', (req, res) => {
    Photo.findByIdAndDelete(req.params.id, (err, deletedPhoto) => {
        if(err){
            res.send(err)
        }else{
            res.redirect('/')
        }
    })
});


module.exports = router;