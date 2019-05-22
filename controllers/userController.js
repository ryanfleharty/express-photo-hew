const express = require('express');
const router = express.Router();
const Photo = require('../models/Photo');
const User = require('../models/User');


// index route- show all the Users
router.get('/', (req, res) =>{
    User.find({}, (err, foundUser) =>{
        res.render('user/index.ejs', {
            user: foundUser
        })
    })
});


//new route
router.get('/new', (req, res) => {
       
    res.render('user/new.ejs');
        
});


//Create user
router.post('/', (req, res) => {
    console.log(req.body);
    User.create(req.body, (err, createdUser) => {
      if(err){
        res.send(err);
      } else {
        res.redirect('/user');
      }
    })
  
  });

//show route
  router.get('/:id', (req, res) => {
    User.findById(req.params.id)
      .populate('photoz')
      .exec((err, foundUser) => {
        console.log(foundUser, "<----- foundUser in the show route")
        console.log(req.params.id, "user id")
        res.render('user/show.ejs', {
          user: foundUser
        });
      });
  });



//Edit

router.get('/:id/edit', (req, res)=>{
  User.findById(req.params.id, (err, foundUser)=>{
    res.render('user/edit.ejs', {
      user: foundUser
    });
  });
});

router.put('/:id', (req, res)=>{
  User.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedUser)=>{
    if(err){
      res.send(err);
    } else {
      res.redirect('/user');
    }
  });
});

router.delete('/:id', (req, res)=> {
  User.findByIdAndRemove(req.params.id, (err, deletedUser) => {

    if(err){
      res.send(err);
    } else {
      console.log(deletedUser, "<--- deletedUser");
      // This article is using the $in operator that will apply the operation deleteMany
      // to all the ids that are inside of the deletedAuthor.articles
      Photo.deleteMany({
        _id: {
          $in: deletedUser.photo // array of article ids to delete
        }
      }, (err, data) => {
        console.log(data, ' after the remove')
        res.redirect('/user');
      })

    }
  })
})




module.exports = router;