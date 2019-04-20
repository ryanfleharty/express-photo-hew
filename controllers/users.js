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


//EDIT

//UPDATE


//SHOW




//EXPORT
module.exports = router;