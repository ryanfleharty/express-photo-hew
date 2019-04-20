const express = require('express');
const router = express.Router();
const Photo = require('../models/photos');
const User = require('../models/users');



//ROUTES


//INDEX
router.get('/', (req, res) => {
    User.find({}, (error, usersFromDatabase) => {
        res.render('users/index.ejs', {
            users: usersFromDatabase
        })
    })
});


//NEW
router.get('/new', (req, res) => {
    res.render('users/new.ejs');
});

//CREATE
router.post('/', (req, res) => {
    User.create(req.body, (error, newUser) => {
        if(error){
            res.send(error);
        } else {
            console.log(newUser);
            res.redirect('/users');
        }
    })
})


//DELETE
router.delete('/:id', (req, res) => {
    User.findByIdAndDelete(req.params.id, (error, deletedUser) => {
        if (error) {
            res.send(error);
        } else {
            Photo.deleteMany({
                _id: {
                    $in: deletedUser.photos
                }
            }, (error, deletedPhotos) => {
                console.log(deletedPhotos);
                res.redirect('/users');
            })
        }
    })
});


//EDIT
router.get('/:id/edit', (req, res) => {
    User.findById(req.params.id, (error, userFromDatabase) => {
        if(error){
            res.send(error);
        } else {
            res.render('users/edit.ejs', {
                user: userFromDatabase
            })
        }
    })
});

//UPDATE
router.put('/:id', (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, (error, userFromDatabase) => {
        if (error) {
            res.send(error)
        } else {
            console.log(userFromDatabase);
            res.redirect('/users')
        }
    })
})

//SHOW
router.get('/:id', (req, res) => {
    User.findById(req.params.id)
    .populate('photos')
    .exec((error, userFromDatabase) => {
        if(error){
            res.send(error);
        } else {
            res.render('users/show.ejs', {
                user: userFromDatabase
            })
        }
    })
});




//EXPORT
module.exports = router;