const express = require('express');
const router = express.Router();
const User = require('../../models/users/userSchema');
const Photo = require('../../models/photos/photoSchema');


//INDEX:
router.get('/', (req, res) => {
    User.find({}, (err, allUsers) => {
        if(err){
            res.send(err);
        } else {
            res.render('./photos/index.ejs', {users: allUsers});
        }
    });
});

router.get('/new', (req, res) => {
    User.find({}, (err, allUsers) => {
        if(err){
            res.send(err);
        } else {
            res.render('./photos/new.ejs', {user: allUsers});
        }
    });
});

//CREATE:
router.post('/', (req, res) => {
    console.log(req.body);
    Photo.create(req.body, (err, newPhoto) => {
        if(err){
            res.send(err);
        } else {
            res.redirect('/users')
        }
    });
});

router.get('/:id', (req, res) => {
    Photo.findById(req.params.id, (err, foundPhoto) => {
        if(err){
            res.send(err);
        } else {
            res.render('./photos/show.ejs', {photo: foundPhoto, user: user});
        }
    });
});


//UPDATE:
router.get('/:id/edit', (req, res) => {
    User.findById(req.params.id, (err, updatedPhoto) => {
        if(err){
            res.send(err);
        } else {
            res.render('./photos/edit.ejs', {
                photos: updatedPhoto
            })
        }
    })
});








//DELETE:
router.delete('/:id', (req, res)=>{
    Photo.findByIdAndRemove(req.params.id, (err, deletedPhoto) => {
      User.findOne({'photos': req.params.id}, (err, foundUser) => {
        if(err){
          res.send(err);
        } else {
          foundUser.photos.remove(req.params.id);
          foundUser.save((err, updatedUser) => {
            console.log(updatedUser);
            res.redirect('/photos');
          });
        }
      });
    });
  });








module.exports = router;