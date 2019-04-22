const express = require('express');
const router = express.Router();
const User = require('../models/users/User');
const Photo = require('../models/photos/Photo');

// SHOW INDEX
router.get('/', (req, res) => {
    // res.send('hi i am here!!!');
    User.find({}, (err, usersFromTheDatabase) => {
        if(err){
            console.log(err);
            res.send(err);
        } else {
            console.log(usersFromTheDatabase);
            res.render('users/index.ejs', {
                usersOnTheTemplate: usersFromTheDatabase
            });
        }
    })
})

// NEW PHOTO

router.post('/', (req, res) => {
    User.create(req.body, (err, newUser) => {
        if(err){
            console.log(err);
            res.send(err);
        } else {
            console.log(newUser);
            res.redirect('/users');
        }
    })
})


router.get('/new', (req, res) => {
    res.render('users/new.ejs');
})

// DELETE

router.delete('/:id', (req, res)=>{
    User.findByIdAndDelete(req.params.id, (err, userFromTheDatabase)=>{
        console.log(userFromTheDatabase);
        Photo.deleteMany({
            _id: {
                $in: userFromTheDatabase.photos
            }
        }, (err, data)=>{
            console.log(data);
            res.redirect('/users');
        })
    })
})


// EDIT PHOTO

router.put('/:id', (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, (err, updateUser) => {
        if(err){
            console.log(err);
            res.send(err);
        } else {
            console.log(updateUser)
            res.redirect('/users')
        }
    })
})


router.get('/:id/edit', (req, res) => {
    User.findById(req.params.id, (err, userFromTheDatabase)=>{
        res.render('users/edit.ejs', {
            userOnTheTemplate: userFromTheDatabase
        })
    })
})


//SHOW JUST ONE

router.get('/:id', (req, res) => {
    User.findById(req.params.id)
    .populate('photos')
    .exec((err, userFromTheDatabase) => {
        if(err){
            console.log(err);
            res.send(err);
        } else {
            res.render('users/show.ejs', {
                userOnTheTemplate: userFromTheDatabase
        });
        }
    })    
})

module.exports = router;