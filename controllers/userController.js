const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportLocal = require('passport-local');
const passportLocalMongoose = require('passport-local-mongoose');
const User = require('../models/user');
const Photo = require('../models/photo');

// index route
router.get('/', (req, res) => {
    User.find({}, (err, users) => {
        res.render('user/index.ejs', {
            users: users,
        })    
    })
});

// new route
router.get('/new', (req, res) => {
    res.render('user/new.ejs')
});

// create route
router.post('/', (req, res) => {
    User.create(req.body, (err, newUser) => {
        if (err){
            res.send(err);
        } else {
            console.log(newUser);
            res.redirect('/users');
        }
    })
});

// router.post('/', (req, res) => {
//     user = user
//     user.register(new User ({
//         username: req.body.username,
//         password: req.body.password
//     }), (err, user) => {
//             if (err){
//                 res.send(err)
//             } else {
//                 passport.authenticate('local')(req, res, () => {
//                     res.redirect('/users/' + user.id)
//                 })
//             }
//         }
//     )
// });

// login 
router.get('/login', (req, res) => {
    res.render('user/login.ejs');
});

router.post('/login', passport.authenticate('local'), (req, res) => {
    User.findById(req.params.id, (err, user) => {
        res.redirect('/users/' + user.id)
    } )
});

// show route
router.get('/:id', (req, res) => {
    User.findById(req.params.id, (err, user) => {
        Photo.findById(req.params.id, (err, photo) => {
            res.render('user/show.ejs', {
                user: user,
                photo: photo
            })
        })
    })
});

// edit route
router.get('/:id/edit', (req, res) => {
    User.findById(req.params.id, (err, user) => {
        res.render('user/edit.ejs', {
            user: user
        })
    })
});

// update route
router.put('/:id', (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, (err, user) => {
        console.log(user);
        res.redirect('/users/' + user.id);
    })
})

// delete route
router.delete('/:id', (req, res) => {
    User.findByIdAndDelete(req.params.id, (err, user) => {
        console.log(user);
        Photo.deleteMany({
            _id: {
                $in: user.photos
            }
        }, (err, data) => {
            console.log(data);
            res.redirect('/users')
        })
    })
})

module.exports = router;