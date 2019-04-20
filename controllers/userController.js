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
})









module.exports = router;
