const express = require('express');
const router = express.Router();
const User = require('../../models/users/userSchema');
const Photo = require('../../models/photos/photoSchema');



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

router.get('/new', (req, res) => {
    res.render('./users/new.ejs');
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

//READ:
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

//UPDATE:
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

router.put('/:id', (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, (err, updatedUser) => {
        if(err){
            res.send(err);
        } else {
            res.redirect('/users')
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






module.exports = router;