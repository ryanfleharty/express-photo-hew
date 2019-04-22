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
    User.find({}, (err, allUsers) => {
        if(err){
            console.log(err)
        }else{
            res.render('photos/new.ejs', {user: allUsers})
        }
    })
    
});

// SHOW ROUTE
router.get('/:id', (req, res) => {
    Photo.findById(req.params.id, (err, foundPhoto)=>{
        User.findOne({"photos": req.params.id}, (err, foundUser)=>{
            console.log(foundPhoto),
            console.log(foundUser),
            res.render('photos/show.ejs', {
                photo: foundPhoto,
                user: foundUser
            }) 
        })
    })
});

// EDIT ROUTE
router.get('/:id/edit', (req, res) => {
  Photo.findById(req.params.id, (err, editPhoto)=>{
      User.find({}, (err, allUsers)=>{
          res.render('photos/edit.ejs', {
              user: allUsers,
              photo: editPhoto
          })
      })
  })
});


// CREATE ROUTE
router.post('/', (req, res) => {
    Photo.create(req.body, (err, newPhoto) => {
        User.findById(req.body.userId, (err, oneUser)=>{
            if(err){
                console.log(err)
            }else{
                oneUser.photos.push(newPhoto._id);
                oneUser.save((err, savedUser)=>{
                    res.redirect('/photos')
                })
            }
        })
    })
})


// UPDATE ROUTE
router.put('/:id', (req, res) => {
    Photo.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedPhoto)=>{
        User.findOne({'photos': req.params.id}, (err, foundUser)=>{
            if(foundUser._id.toString() !== req.body.userId){
                foundUser.photos.remove(req.params.id);
                foundUser.save((err, savedUser)=>{
                    User.findById((req.body.userId, (err, newUser)=>{
                        newUser.photos.push(updatedPhoto._id);
                        newUser.save((err, savedNewUser)=>{
                            res.redirect('/photos/' + req.params.id);
                        })
                    }))
                })
            }else{
                res.redirect('/photos/' + req.params.id)
            }
        })
    })
})

// DELETE ROUTE
router.delete('/:id', (req, res) => {
    Photo.findByIdAndDelete(req.params.id, (err, deletedPhoto) => {
        User.findOne({'photos': req.params.id}, (err, foundUser)=>{
            if(err){
                console.log(err)
            }else{
                foundUser.photos.remove(req.params.id);
                foundUser.save((err, updatedUser)=>{
                    console.log(updatedUser);
                    res.redirect('/photos')
                })
            }
        })
    })
});


module.exports = router;