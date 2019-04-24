/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
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

// SEARCH route
router.get('/search', (req, res) => {
  Photo.find(
    { $text: { $search: req.query.title } },
    { score: { $meta: 'textScore' } })
    .sort({ score: { $meta: 'textScore' } })
    .exec((err, matchingPhotos) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        console.log(req.query.title);
        console.log(matchingPhotos);
        res.render('photos/search.ejs', {
          photos: matchingPhotos,
        });
      }
    });
});

// NEW
router.get('/new', (req, res) => {
  User.find({}, (err, foundUsers) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      console.log(foundUsers);
      res.render('photos/new.ejs', {
        users: foundUsers,
      });
    }
  });
});

// CREATE
router.post('/', (req, res) => {
  Photo.create(req.body, (err, createdPhoto) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      console.log(createdPhoto);
      User.findById(req.body.userId, (err, foundUser) => {
        if (err) {
          console.log(err);
          res.send(err);
        } else {
          console.log(foundUser);
          foundUser.photos.push(createdPhoto._id);
          foundUser.save((err, savedUser) => {
            if (err) {
              console.log(err);
              res.send(err);
            } else {
              console.log(savedUser);
              res.redirect('/photos');
            }
          });
        }
      });
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

      const month = convertMonthTextToNumStr(foundPhoto.uploadDate.toString().toLocaleUpperCase().slice(4, 7));
      const day = foundPhoto.uploadDate.toString().slice(8, 10);
      const year = foundPhoto.uploadDate.toString().slice(11, 15);
      const datePickerFormat = `${year}-${month}-${day}`;

      User.find({ photos: req.params.id }, (err, foundOldUser) => {
        if (err) {
          console.log(err);
          res.send(err);
        } else {
          console.log(foundOldUser);
          User.find({}, (err, foundAllUsers) => {
            if (err) {
              console.log(err);
              res.send(err);
            } else {
              console.log(foundAllUsers);
              res.render('photos/edit.ejs', {
                photo: foundPhoto,
                oldUser: foundOldUser,
                users: foundAllUsers,
                datePickerFormat,
              });
            }
          });
        }
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
      User.findOne({ photos: req.params.id }, (err, foundUser) => {
        if (foundUser._id.toString() !== req.body.userId) {
          foundUser.photos.remove(req.params.id);
          foundUser.save((err, savedOldUser) => {
            if (err) {
              console.log(err);
              res.send(err);
            } else {
              console.log(savedOldUser);
              User.findById(req.body.userId, (err, foundUpdatedUser) => {
                if (err) {
                  console.log(err);
                  res.send(err);
                } else {
                  foundUpdatedUser.photos.push(updatedPhoto._id);
                  foundUpdatedUser.save((err, savedUpdatedUser) => {
                    if (err) {
                      console.log(err);
                      res.send(err);
                    } else {
                      console.log(savedUpdatedUser);
                      res.redirect(`/photos/${req.params.id}`);
                    }
                  });
                }
              });
            }
          });
        } else {
          res.redirect(`/photos/${req.params.id}`);
        }
      });
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
      User.findOne({ photos: req.params.id }, (err, foundUser) => {
        if (err) {
          console.log(err);
          res.send(err);
        } else {
          console.log(foundUser);
          res.render('photos/show.ejs', {
            photo: foundPhoto,
            user: foundUser,
          });
        }
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
      User.findOne({ photos: req.params.id }, (err, foundUser) => {
        if (err) {
          console.log(err);
          res.send(err);
        } else {
          console.log(foundUser);
          foundUser.photos.remove(req.params.id);
          foundUser.save((err, savedUser) => {
            if (err) {
              console.log(err);
              res.send(err);
            } else {
              console.log(savedUser);
              res.redirect('/photos');
            }
          });
        }
      });
    }
  });
});

module.exports = router;
