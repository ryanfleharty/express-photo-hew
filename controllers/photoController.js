// requires
const express = require('express');
const router = express.Router();
const Photo = require('../models/Photo');

// INDEX
router.get('/', (req, res) => {
  Photo.find({}, (err, foundPhotos) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      console.log(foundPhotos);
      res.render('photoIndex.ejs', {
        photos: foundPhotos,
      });
    }
  });
});

// NEW
router.get('/new', (req, res) => {
  res.render('photoNew.ejs');
});

// CREATE
router.post('/', (req, res) => {
  Photo.create(req.body, (err, createdPhoto) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      console.log(createdPhoto);
      res.redirect('/photos');
    }
  });
});


// EDIT
router.get('/:id/edit', (req, res) => {
  Photo.findById(req.params.id, (err, foundPhoto) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      console.log(foundPhoto);
      res.render('photoEdit.ejs', {
        photo: foundPhoto,
      });
    }
  });
});

// UPDATE
router.put('/:id', (req, res) => {
  Photo.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedPhoto) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      console.log(updatedPhoto);
      res.redirect('/photos');
    }
  });
});

// SHOW
router.get('/:id', (req, res) => {
  Photo.findById(req.params.id, (err, foundPhoto) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      console.log(foundPhoto);
      res.render('photoShow.ejs', {
        photos: foundPhoto,
      });
    }
  });
});

// DELETE
router.delete('/:id', (req, res) => {
  Photo.findByIdAndDelete(req.params.id, (err, deletedPhoto) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      console.log(deletedPhoto);
      res.redirect('/photos');
    }
  });
});

module.exports = router;
