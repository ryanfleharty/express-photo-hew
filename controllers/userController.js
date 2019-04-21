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
    User.findById(req.params.id, (err, oneUser) => {
        if(err){
            res.send(err)
        }else{
            res.render('users/:id/show.ejs')
        }
    })
})



// EDIT ROUTE
router.get('/:id/edit', (req, res) => {
    res.render('users/:id/edit.ejs', {user: User})
});

// UPDATE ROUTE
router.put('/', (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, (err, updatedUser) => {
        if(err){
            res.send(err)
        }else{
            res.redirect('/photos', {user: updatedUser})
        }
    })
})

// DELETE ROUTE
router.delete('/:id', (req, res) => {
    User.findByIdAndDelete(req.params.id, (err, deletedUser) => {
        if(err){
            console.log(err)
        }else{
            res.redirect('/users')
        }
    })
});


module.exports = router;