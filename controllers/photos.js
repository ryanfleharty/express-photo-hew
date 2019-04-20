const express = require('express');
const router = express.Router();
const Photo = require('../models/photos');
const User = require('../models/users');


// ROUTES 

// INDEX ROUTE
router.get('/', (req, res) => {
    Photo.find({}, (error, returnedPhotos) => {
        if(error){
            res.send(error);
        } else {
            res.render('photos/index.ejs', {
                allPhotos: returnedPhotos
            })
        }
    })
});

// NEW ROUTE - ask db for the users so you can use them on the new page
router.get('/new', (req, res) => {
    User.find({}, (error, allUsers) => {
        if(error) {
            res.send(error)
        } else {
            res.render('photos/new.ejs', {
                users: allUsers
            })
        }
    })
});

// CREATE ROUTE
router.post('/', (req, res) => {
    Photo.create(req.body, (err, newPhoto) => {
        console.log(`created a new photo for user id: ${req.body.name}`);
        User.findById(req.body.name, (error, foundUser) => {
            if(error){
                res.send(error);
            } else {
                foundUser.photos.push(newPhoto);
                console.log(newPhoto);
                foundUser.save((error, savedUser) => {
                    console.log(savedUser);
                    res.redirect('/photos');
                })
            }
        })
    });
});

// DELETE ROUTE
router.delete('/:id', (req, res) => {
    
    Photo.findByIdAndDelete(req.params.id, (error, deletedPhotoFromDb) => {
        if (error){
            res.send(error)
        } else {
            User.findOne({'photos': req.params.id}, (error, foundUser) => {
                if(error){
                    res.send(error);
                } else {
                    foundUser.photos.remove(req.params.id);
                    foundUser.save((error, updatedUser) => {
                        console.log(updatedUser);
                        res.redirect('/photos')
                    })
                }
            })
        }
    });
});


// EDIT ROUTE
router.get('/:id/edit', (req, res) => {
    Photo.findById(req.params.id, (error, photoFromDb) => {
        if(error){
            res.send(error)
        } else {
            User.find({}, (error, usersFromDb) => {
                res.render('photos/edit.ejs', {
                  photo: photoFromDb,
                  user: usersFromDb  
                })
            })
        }
    })


    // Photo.findById(req.params.id, (error, foundPhoto) =>{
    //     if(error){
    //         console.log(error);
    //     } else {
    //         res.render('photos/edit.ejs', {
    //             photo: foundPhoto,
    //             id: req.params.id
    //         })
    //     }
    // })
});

// UPDATE ROUTE
router.put('/:id', (req, res) => {
    Photo.findOneAndUpdate({_id: req.params.id}, req.body, (error, foundPhoto) => {
        if(error) {
            console.log(error);
        } else {
            foundPhoto = req.body;
            res.redirect('/photos');
            console.log(foundPhoto);
        }
    })
})


// SHOW ROUTE
router.get('/:id', (req, res) => {
    Photo.findById(req.params.id, (error, foundPhoto) =>{
        if(error){
            console.log(error)
        } else {
            res.render('photos/show.ejs', {
                photo: foundPhoto,
                id: req.params.id
            })
        }
    })
})




module.exports = router;