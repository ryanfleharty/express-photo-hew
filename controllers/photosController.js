const express = require('express')
const mongoose = require('mongoose');
const router = express.Router();
const Photos = require('../models/Photo.js')



//INDEX
router.get('/', (req,res) => {
    Photos.find({}, (err,foundPhotos) => {
        if (err){
            res.send(err);
        } else {
                //console.log(foundPhotos)
                res.render('index.ejs', {
                photos: foundPhotos
            });
        }
    })
})


//NEW
router.get('/new', (req, res) =>{
    res.render('new.ejs')
})

//CREATE
router.post('/', (req, res) => {
    Photos.create(req.body, (err, createdPhoto) => {
        if(err){
          res.send(err);
        } else {
          console.log(createdPhoto);
          res.redirect('/photos');
        }
      })
})


//SHOW
router.get('/:id', (req, res) => {
    Photos.findById(req.params.id, (err, foundPhoto) => {
        if(err){
            res.send(err);
          } else {
            console.log(foundPhoto);
            res.render('show.ejs', {
                photos: foundPhoto,
            });
          }
    });
  });


  //DELETE
router.delete('/:id', (req, res) => {
    Photos.findByIdAndDelete(req.params.id, (err, deletedPhoto) => {
        if(err){
          res.send(err);
        } else {
          console.log(deletedPhoto);
          res.redirect('/photos');
        }
      })
  })











module.exports = router;


