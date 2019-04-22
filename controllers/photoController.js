const express = require('express');
const router = express.Router();
const Photo = require('../models/photo');
const User = require('../models/user')

// index route
// The home (index) page should show all of the pictures that 
// have been submitted.
router.get('/', (req, res)=> {
    Photo.find({}, (err, photo) => {
        if (err){
            res.send(err);
        } else {
            res.render('photo/index.ejs', {
                uploadedPhotos: photo
            })
        }
    })
});

// new route
router.get('/new', (req, res) => {
    Photo.findById(req.params.id, (err, newPhotoUpload) => {
        if (err){
            res.send(err);
        } else {
            res.render('photo/new.ejs')
        }    
    })
});

// // create route
// router.post('/', (req, res) => {
//     Photo.create(req.body, (err, newPhotoUpload) => {
//         if (err){
//             res.send(err);
//         } else {
//             res.redirect('/photos')
//         }  
//     })
// });

// create route
router.post('/', (req, res) => {
    Photo.create(req.body, (err, newPhotoUpload) => {
        console.log(newPhotoUpload._id)
        console.log(`photo added by user ${req.body.userId}`);
        User.findOne(req.body.userId, function (err, userFound){
            console.log(userFound)
            console.log(userFound.photos)
            userFound.photos.push(newPhotoUpload._id);
            userFound.save((err, savedUser) => {
                if (err){
                    res.send(err);
                } else {
                    console.log(savedUser);
                    res.redirect('/photos')
                }  
            })
        })

    })
});

// show route
router.get('/:id', (req, res) => {
    Photo.findById(req.params.id, (err, photoToShow) => {
        User.findOne({
            'photos': req.params.id
        }, (err, user) => {
            if (err){
                res.send(err);
            } else {
                res.render('photo/show.ejs', {
                    photo: photoToShow,
                    user: user,
                })
            }  
        })
    })
});

// edit route
router.get('/:id/edit', (req, res) => {
    Photo.findById(req.params.id, (err, photoToEdit) => {
        if (err) {
            res.send(err);
        } else {
            res.render('photo/edit.ejs', {
                photo: photoToEdit,
            });
        }
    })
});

// update route
router.put('/:id', (req, res) => {
    Photo.findByIdAndUpdate(req.params.id, req.body, (err, editedPhoto) => {
        if (err) {
            res.send(err);
        } else {
            editedPhoto = req.body;
            res.redirect('/photos')
        }
    })
});

// delete route
router.delete('/:id', (req, res) => {
    Photo.findByIdAndDelete(req.params.id, (err, photoToDelete) => {
        console.log(photoToDelete);
        User.findOne({'photos': req.params.id}, (err, userFound) => {
            if (err) {
                res.send(err);
            } else {
                userFound.photos.remove(req.params.id);
                userFound.save((err, updatedUser) => {
                    console.log(updatedUser);
                    res.redirect('/photos')
                })
            }
        })
    })
});




module.exports = router;