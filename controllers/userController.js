/* eslint-disable no-shadow */
// requires
const express = require('express');

const router = express.Router();
const User = require('../models/User');
const Photo = require('../models/Photo');

// INDEX
router.get('/', (req, res) => {
  User.find({}, (err, foundUsers) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      console.log(foundUsers);
      res.render('users/index.ejs', {
        users: foundUsers,
      });
    }
  });
});

// SEARCH route
router.get('/search', (req, res) => {
  User.find(
    { $text: { $search: req.query.name } },
    { score: { $meta: 'textScore' } })
    .sort({ score: { $meta: 'textScore' } })
    .exec((err, matchingUsers) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        console.log(req.query.name);
        console.log(matchingUsers);
        res.render('users/search.ejs', {
          users: matchingUsers,
        });
      }
    });
});

// NEW
router.get('/new', (req, res) => {
  res.render('users/new.ejs');
});

// CREATE
router.post('/', (req, res) => {
  User.create(req.body, (err, createdUser) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      console.log(createdUser);
      res.redirect('/users');
    }
  });
});


// EDIT
router.get('/:id/edit', (req, res) => {
  User.findById(req.params.id, (err, foundUser) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      console.log(foundUser);
      res.render('users/edit.ejs', {
        user: foundUser,
      });
    }
  });
});


// UPDATE
router.put('/:id', (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedUser) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      console.log(updatedUser);
      res.redirect('/users');
    }
  });
});

// SHOW ***NEED TO REFACTOR***
router.get('/:id', (req, res) => {
  User.findById(req.params.id).populate('photos').exec((err, foundUser) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      console.log(foundUser);
      res.render('users/show.ejs', {
        user: foundUser,
      });
    }
  });
});

// DELETE ***NEED TO REFACTOR***
router.delete('/:id', (req, res) => {
  User.findByIdAndDelete(req.params.id, (err, deletedUser) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      console.log(deletedUser);
      Photo.deleteMany({ _id: { $in: deletedUser.photos } }, (err, deletedData) => {
        if (err) {
          console.log(err);
          res.send(err);
        } else {
          console.log(deletedUser);
          console.log(deletedData);
          res.redirect('/users');
        }
      });
    }
  });
});

module.exports = router;
