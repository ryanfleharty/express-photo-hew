const express = require('express');
// const mongoose = require('mongoose');
const router = express.Router();
const User = require('../../models/users/userSchema');



//INDEX:
router.get('/', (req, res) => {
    User.find({}, (err, allUsers) => {
        if(err){
            res.send(err);
        } else {
            res.render('users/index.ejs', {users: allUsers});
        }
    });
    
});


//CREATE:
router.post('/', (req, res) => {
    console.log(req.body);
    User.create(req.body, (err, newUser) => {
        if(err){
            res.send(err);
        } else {
            res.redirect('/users')
        }
    });
});

router.get('/new', (req, res) => {
    res.render('./users/new.ejs');
});



router.get('/:id', (req, res) => {
    User.findById(req.params.id, (err, foundUser) => {
        if(err){
            res.send(err);
        } else {
            res.render('./users/show.ejs', {
                users: foundUser
            })
        }
    })
});


router.get('/:id/edit', (req, res) => {
    User.findById(req.params.id, (err, updatedUser) => {
        if(err){
            res.send(err);
        } else {
            res.render('./users/edit.ejs', {
                users: updatedUser
            })
        }
    })
});









//DELETE:
router.delete('/:id', (req, res) => {
  User.findByIdAndDelete(req.params.id, (err, item)=>{
    if (err){
      console.log(err);
      res.send(err);
    } else {
        console.log(item);
      res.redirect('/users')
    }
  })
});






module.exports = router