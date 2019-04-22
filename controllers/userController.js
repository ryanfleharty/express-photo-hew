const express = require('express');
const router = express.Router();
const Photo = require('../models/photoModel');
const User = require('../models/userModel');

// INDEX ROUTE
router.get('/', (req, res)=>{
    User.find({}, (err, allUsers) => {
        if(err){
            res.send(err)
        }else{
            res.render('users/index.ejs', {user: allUsers})
        }
    })
});

// NEW ROUTE
router.get('/new', (req, res) => {
    res.render('users/new.ejs')
});


// CREATE ROUTE
router.post('/', (req, res) => {
    User.create(req.body, (err, newUser) => {
        if(err){
            res.send(err)
        }else{
            res.redirect('/users')
        }
    })
})

// SHOW ROUTE
router.get('/:id', (req, res) => {
    User.findById(req.params.id)
    .populate('photos')
    .exec((err, foundUser)=>{
        if(err){
            res.send(err)
        }else{
            res.render('users/show.ejs', {user: foundUser})
        }
    })
});


// EDIT ROUTE
router.get('/:id/edit', (req, res) => {
    User.findById(req.params.id, (err, editUser) => {
        if(err){
            console.log(err)
        }else{
            console.log(editUser),
            res.render('users/edit.ejs', {user: editUser})
        }
    })
    
});

// UPDATE ROUTE
router.put('/:id', (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, (err, updatedUser) => {
        if(err){
            res.send(err)
        }else{
            res.redirect('/users')
        }
    })
})

// DELETE ROUTE
router.delete('/:id', (req, res) => {
    User.findByIdAndDelete(req.params.id, (err, deletedUser) => {
        if(err){
            console.log(err)
        }else{
            Photo.deleteMany({
                _id: {
                    $in: deletedUser.photos
                }
            }, (err, data)=>{
                console.log(data, 'data');
                res.redirect('/users')
            })
            
        }
    })
});


module.exports = router;