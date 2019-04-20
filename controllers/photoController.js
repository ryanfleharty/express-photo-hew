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













module.exports = router;
