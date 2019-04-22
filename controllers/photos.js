const express = require('express');
const router = express.Router();
const Photo = require('../models/photos/Photo');
const User = require('../models/users/User');

// SHOW INDEX
router.get('/', (req, res) => {
    // res.send('hi i am here!!!');
    Photo.find({}, (err, photosFromDatabase) => {
        if(err){
            console.log(err);
            res.send(err);
        } else {
            console.log(photosFromDatabase);
            res.render('photos/index.ejs', {photosOnTheTemplate: photosFromDatabase});
        }
    })
})

// NEW PHOTO

router.post('/', (req, res) => {
    Photo.create(req.body, (err, newPhoto) => {
        console.log(`created a new photo for user ${req.body.userId}`)
        User.findById(req.body.userId, (err, userFound) => {
            userFound.photos.push(newPhoto._id);
            userFound.save((err, savedUser) => {
                console.log(savedUser);
                if(err){
                    console.log(err);
                    res.send(err);
                } else {
                    console.log(newPhoto);
                    res.redirect('/photos');
                }
    })
})
    })
})


router.get('/new', (req, res) => {
    User.find({}, (err, allUsers) => {
        if(err) {
            res.send(err)
        } else {
            res.render('photos/new.ejs', {
                usersOnTemplate: allUsers
            });
        }
    })
})

// DELETE

router.delete('/:id', (req, res)=>{
    Photo.findByIdAndDelete(req.params.id, (err, photoFromTheDatabase)=>{
        console.log(photoFromTheDatabase);
        User.findOne({'photos': req.params.id}, (err, foundUser)=>{
            if(err){
                console.log(err)
            }else{
                console.log(foundUser);
                foundUser.photos.remove(req.params.id);
                foundUser.save((err, updatedUser)=>{
                    console.log(updatedUser);
                    res.redirect('/photos');  
                })
            };
        });
    });
});



// EDIT PHOTO

router.put('/:id', (req, res)=>{
    console.log(req.body);
    Photo.findByIdAndUpdate(req.params.id, req.body, {new: true},(err, updatedCat)=>{
      User.findOne({'photos': req.params.id}, (err, foundUser) => {
        if(foundUser._id.toString() !== req.body.userId){
          foundUser.photos.remove(req.params.id);
          foundUser.save((err, savedFoundUser) => {
            User.findById(req.body.userId, (err, newUser) => {
              newUser.photos.push(updatedPhoto._id);
              newUser.save((err, savedNewUser) => {
                res.redirect('/photos/' + req.params.id);
              })
            })
          })
        } else {
          res.redirect('/photos/' + req.params.id)
        }
      })
    });
  });


  router.get('/:id/edit', (req, res)=>{
    Photo.findById(req.params.id, (err, photoFromTheDatabase)=>{
        User.find({}, (err, usersFromTheDatabase)=>{
            res.render('photos/edit.ejs', {
                photoOnTheTemplate: photoFromTheDatabase,
                usersOnTemplate: usersFromTheDatabase
            });
        })

    })
})

//SHOW JUST ONE

router.get('/:id', (req, res) => {
    Photo.findById(req.params.id, (err, photoFromTheDatabase) => {
      User.findOne({
        "photos": req.params.id
      }, (err, user) => {
        res.render('photos/show.ejs', {
          photoOnTheTemplate: photoFromTheDatabase,
          user: user
        });
      })
    })
   })


module.exports = router;