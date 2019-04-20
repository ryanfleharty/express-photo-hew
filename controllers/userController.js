// requires
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Cat = require('../models/Photo');

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

// SHOW
router.get('/:id', (req, res) => {
  User.findById(req.params.id, (err, foundUser) => {
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

// DELETE
router.delete('/:id', (req, res) => {
  User.findByIdAndDelete(req.params.id, (err, deletedUser) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      console.log(deletedUser);
      res.redirect('/users');
    }
  });
});

module.exports = router;
