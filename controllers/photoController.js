const express = require('express')
const router  = express.Router()
const multer              = require('multer');
const cloudinary          = require('cloudinary');
const cloudinaryStorage   = require('multer-storage-cloudinary')
cloudinary.config({
cloud_name: 'dgvqvmlnk',
api_key: '264931654358161',
api_secret: 'N1LrlJdkevAuozSspbeXNSDCbIo'
});
const storage = cloudinaryStorage({
cloudinary: cloudinary,
folder: "/blogApp",
allowedFormats: ["jpg", "png"],
transformation: [{ width: 500, height: 500, crop: "limit" }]
});
const parser = multer({ storage: storage });
const User    = require('../models/userSchema')
const Photo   = require('../models/photoSchema')


router.get('/:id', (req,res)=>{
  User.findOne({photos: req.params.id}, (err, user)=>{
    Photo.findById(req.params.id, (err,foundPhoto)=>{
      if (err) {
        console.log(err);
      } else {
        res.render('photos/show.ejs', {
          image: foundPhoto,
          user: user
        })
      }
    })
  })
})


router.get('/', (req,res)=>{
  Photo.find({}, (err, foundPhotos)=>{
    res.render('photos/index.ejs', {
      photos: foundPhotos
    })
  })
})


router.get('/:id/new', (req,res)=>{
  res.render('photos/new.ejs', {
    userId: req.params.id
  })
})

router.post('/users/:id', parser.single('image'), (req,res)=>{
  if (req.file) {
    Photo.create({
      url: req.file.url,
      caption: req.body.caption,
      location: req.body.location,
      datePosted: new Date(),
      likes: 0
    }, (err, createdImage)=>{
      User.findByIdAndUpdate(req.params.id, {
        $push: {photos: createdImage._id}
      }, (err, user)=>{
        res.redirect(`/users/${req.params.id}`)
      })
    })
  } else {
    Photo.create({
      url: req.body.url,
      caption: req.body.caption,
      location: req.body.location,
      datePosted: new Date(),
      likes: 0
    }, (err, createdImage)=>{
      User.findByIdAndUpdate(req.params.id, {
        $push: {photos: createdImage._id}
      }, (err, user)=>{
        res.redirect(`/users/${req.params.id}`)
      })
    })
  }
})

router.delete('/:id', (req,res)=>{
  Photo.findByIdAndDelete(req.params.id, (err,deletedPhoto)=>{
    if (err) {
        console.log(err);
    } else {
      User.update({photos: req.params.id},
        {$pull: {photos: req.params.id}},
        (err, updatedUser)=>{
        if (err) {
        console.log(err);
      } else {
        res.redirect('/photos')
      }
      })
    }
  })
})

router.get('/:id/edit', (req,res)=>{
  Photo.findById(req.params.id, (err,foundPhoto)=>{
    res.render('photos/edit.ejs', {
      photo: foundPhoto
    })
  })
})

router.put('/:id', (req,res)=>{
  Photo.findByIdAndUpdate(req.params.id,{
    caption: req.body.caption,
    location: req.body.location
  }, (err,updatedPhoto)=>{
    if (err) {
      console.log(err);
    } else {
      res.redirect(`/photos/${req.params.id}`)
    }
  })
})



module.exports = router;
