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
            res.render('index.ejs', {photo: allPhotos});
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

// SHOW ROUTE
router.get('/:id', (req, res) =>{
    Photo.findById(req.params.id, (err, foundPhoto)=>{
        if(err){
            console.log(err);
        } else {
            res.render('show.ejs', {photos: foundPhoto})
        }
    })
});

// UPDATE ROUTE

router.put('/:id', (req, res) =>{
    Photo.findByIdAndUpdate(req.params.id, req.body, (err, updatedPhoto) =>{
        if(err){
            console.log(err);

            } else {
                console.log(updatedPhoto);
                res.redirect('/photos', {photo: updatedPhoto})
    
        }
    })
});

// EDIT ROUTE 

router.get('/:id/edit', (req, res) =>{
    Photo.findByIdAndUpdate(req.params.id, req.body, (error, updatedPhoto) =>{
      if (error){
        console.log(error)
      } else {
        console.log(updatedPhoto);
    res.render('edit.ejs', {
        id: req.params.id,
        photo: updatedPhoto
    });
    }
    })
});


// DELETE ROUTE

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

module.exports = router; 