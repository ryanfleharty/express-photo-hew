const express = require('express');
const router = express.Router();
const Photos = require('../models/photos');
const Users = require('../models/users');



// Index route
router.get('/', (req, res) => {
    Photos.find({}, (error, foundPhotos) => {
        if(error){
            console.log(error);
        } else {
            res.render('index.ejs', {
                photos: foundPhotos
            })
        }
    })
});


// New Route
router.get('/new', (req, res) =>{
    Users.find({}, (err, allUsers) => {
	   res.render('../views/new.ejs',{
            users: allUsers
       })
    })
});


// Create Route
router.post('/', (req, res) => {
    Users.findById(req.body.userId, (err, foundUser)=>{


        Photos.create(req.body, (error, newPhoto) => {
            if (error){
                console.log(error)
            } else {
            foundUser.photos.push(newPhoto);
            foundUser.save((err, data) => {
                res.redirect('/photos');
                username: foundUser;        
           });
        }            
    })
    });
    });




// Edit Route
router.get('/:id/edit', (req, res) =>{
    Photos.findByIdAndUpdate(req.params.id, req.body, (error, updatedPhoto) =>{
      if (error){
        console.log(error)
      } else {
        console.log(updatedPhoto);
	res.render('edit.ejs', {
		id: req.params.id,
		photo: updatedPhoto
	});
	}
	})
});

// // Update Route
router.put('/:id', (req, res) => {
	Photos.findByIdAndUpdate(req.params.id, req.body, (err, foundPhoto) => {
		res.redirect('/photos');
	});
});



// Delete Route
router.delete('/:id', (req, res) => {
    Photos.findByIdAndDelete(req.params.id, (error, deletedPhoto) =>{
      if (error){
        console.log(error)
      } else {
        console.log(deletedPhoto);
        res.redirect('/photos')
      }
    })
  });


// Show Route
router.get('/:id', (req, res) =>{
	Photos.findById(req.params.id, (err, foundPhoto)=>{
        Users.findOne({'photos': req.params.id}, (err, foundUser) => {
                    res.render('show.ejs', {
                        photo: foundPhoto,
                        user: foundUser

                    });
                    console.log(foundUser)
                });
            });
        });


router.get('/:id', (req, res) => {
    Photos.findById(req.params.id, (err, foundPhoto) => {
        console.log(foundPhoto, ' this is foundPhoto');
        // Find the user of the photo
        Users.findOne({'photos._id': req.params.id}, (err, foundUser) => {
            console.log(foundUser, ' this is foundUser');
            res.render('photos/show.ejs', {
                photo: foundPhoto,
                user: foundUser
            });
        });
    });
});




// New Route
router.get('/new', (req, res) =>{
    Users.find({}, (err, allUsers) => {
       res.render('../views/new.ejs',{
            users: allUsers
       })
    })
});






module.exports = router;
