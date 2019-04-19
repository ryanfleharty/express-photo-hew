const express = require('express');
const router = express.Router();
const Photo = require('../models/photo/photo');


    
router.get('/', (req, res) => {
    Photo.find({}, (err, photo) => {
        if (err) {
            res.send(err);
        } else {
            res.render('photo/index.ejs', {
                photo: Photo
            });
        }
    });
});

// router.post('/', (req, res) => {
//     console.log(req.body, "<-- req.body will have the contents of the form");
//     Photo.create(req.body, (err, newPhoto) => {
//         if (err) {
//             res.send(err);
//         } else {
//             res.redirect('/photo');
//         }
//     })

// });

// router.get('/new', (req, res) => {
//     res.render('photo/new.ejs');
// });

// router.get('/:id', (req, res) => {
//     photo.findOne({
//         _id: req.params.id
//     }, (err, foundphoto) => {
//         if (err) {
//             res.send(err);
//         } else {
//             console.log(typeof foundphoto, 'foundphoto');
//             if (foundphoto != null) {

//                 res.render('photo/show.ejs', {
//                     photo: foundphoto
//                 });
//             } else {
//                 res.send('no photo found')
//             }
//         }
//     });
// });
module.exports = router;