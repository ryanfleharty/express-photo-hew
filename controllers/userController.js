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



router.get('/new', (req,res)=>{
  res.render("users/new.ejs")
})

router.post('/', parser.single('image'), (req,res)=>{
    // The parser is the variable name for multer which sends a
    // .single file names 'images' to parser.storage which is defined
    // above as storage which is defined as cloudinaryStorge which
    // first checks if it is a 'jpg' or 'png', then tranforms it
    // to have a width and height of 500, then it sends it to the
    // /blogApp folder that exists online in my cloudinary account
    // which is defined in cloudinary.config
    if (req.file){
    Photo.create({
      url: req.file.url,
      caption: "",
      location: "",
      datePosted: new Date(),
      likes: 0,
    }, (err, image)=>{
      User.create({
        name: req.body.name,
        description: req.body.description,
        relationshipStatus: req.body.relationshipStatus,
        profilePicture: image.url,
        photos: [image._id]
      }, (err, newUser)=>{
        res.redirect('/users')
      })
    })
  } else {
    User.create({
      name: req.body.name,
      description: req.body.description,
      relationshipStatus: req.body.relationshipStatus,
      photos: []
    }, (err, newUser)=>{
      res.redirect('/users')
    })
  }
})

router.get('/', (req,res)=>{
  User.find({}, (err,foundUsers)=>{
    res.render('users/index.ejs', {
      users: foundUsers
    })
  })
})

router.get('/:id', (req,res)=>{
  User
  .findById(req.params.id)
  .populate('photos')
  .exec((err, foundUser)=>{
    res.render('users/show.ejs', {
      user: foundUser
    })
  })
})

router.delete('/:id', (req,res)=>{
  User.findByIdAndDelete(req.params.id, (err,deletedUser)=>{
    if (err) {
        console.log(err);
    } else {
      Photo.deleteMany({
        _id:
        {
          $in: deletedUser.photos
        }
      }, (err, deletedPhotos)=>{
        if (err) {
        console.log(err);
      } else {
        res.redirect('/users')
      }
      })
    }
  })
})



module.exports = router;
