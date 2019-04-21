const express = require('express');
const router = express.Router();
const User = require('../../models/users/userSchema');
const Photo = require('../../models/photos/photoSchema');



//INDEX:
router.get('/', (req, res) => {
    Photo.find({}, (err, allPhotos) => {
        if(err){
            res.send(err);
        } else {
            res.render('./photos/index.ejs', {photos: allPhotos});
        }
    });
});

router.get('/new', (req, res) => {
    res.render('./photos/new.ejs');
})






module.exports = router;