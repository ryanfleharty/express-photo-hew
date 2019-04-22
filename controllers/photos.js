const express = require('express');
const router = express.Router();
const Photos = require('../models/photos');



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
	res.render('../views/new.ejs')
})


// Create Route
router.post('/', (req, res) => {
    Photos.create(req.body, (error, newPhoto) => {
        if (error){
            console.log(error)
        } else {
            console.log(newPhoto);
            res.redirect('/photos')
        }
    })
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
		res.render('show.ejs', {
		id: req.params.id,
		photo: foundPhoto
		})
	});

});







module.exports = router;
