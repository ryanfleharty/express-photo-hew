// requires
const express = require('express');
const router = express.Router();
const Photo = require('../models/Photo');
const User = require('../models/User');

// INDEX
router.get('/', (req, res) => {
  Photo.find({}, (err, foundPhotos) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      console.log(foundPhotos);
      res.render('photos/index.ejs', {
        photos: foundPhotos,
      });
    }
  });
});

// NEW
router.get('/new', (req, res) => {
  res.render('photos/new.ejs');
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

const convertMonthTextToNumStr = (month) => {
  switch (month) {
    case 'JAN':
      month = '01';
      break;
    case 'FEB':
      month = '02';
      break;
    case 'MAR':
      month = '03';
      break;
    case 'APR':
      month = '04';
      break;
    case 'MAY':
      month = '05';
      break;
    case 'JUN':
      month = '06';
      break;
    case 'JUL':
      month = '07';
      break;
    case 'AUG':
      month = '08';
      break;
    case 'SEP':
      month = '09';
      break;
    case 'OCT':
      month = '10';
      break;
    case 'NOV':
      month = '11';
      break;
    default: // DEC
      month = '12';
  }
  return month;
};

// EDIT
router.get('/:id/edit', (req, res) => {
  Photo.findById(req.params.id, (err, foundPhoto) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      console.log(foundPhoto);

      const month = convertMonthTextToNumStr(foundPhoto.createdDate.toString().slice(4, 7));
      const day = foundPhoto.createdDate.toString().slice(8, 10);
      const year = foundPhoto.createdDate.toString().slice(11, 15);
      const datePickerFormat = `${year}-${month}-${day}`;

      res.render('photos/edit.ejs', {
        photo: foundPhoto,
        datePickerFormat,
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
      res.render('photos/show.ejs', {
        photo: foundPhoto,
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
