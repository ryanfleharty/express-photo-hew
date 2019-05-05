const express = require('express');
const router = express.Router();
const Users = require('../models/users');
const Photos = require('../models/photos');


router.get('/', (req, res) => {
	Users.find({}, (err, foundUsers) => {
		if(err) {
			res.send(err);
		} else {
			res.render('users/index.ejs', {
				users: foundUsers
			});
		};
	});
});

router.get('/new', (req, res) => {
	res.render('users/new.ejs');
});

router.post('/', (req, res) => {
	Users.create(req.body, (err, createdUser) => {
		        if (err){
            console.log(er)
        } else {
		console.log(createdUser, 'New User Added');
		res.redirect('/users');
	}
	});
});

// router.get('/:id', (req, res) => {
// 	Users.findById(req.params.id, (err, foundUser) => {
// 		        if (err){
//             console.log(err)
//         } else {
// 		res.render('users/show.ejs', {
// 			user: foundUser

// 		});
// 		}
// 	});
// });
router.get('/:id', (req, res) => {
    Users.findById(req.params.id).populate('photos').exec((err, foundUser) => {
        if(err){
            res.send(err);
        } else {
            Photos.findById()
            console.log(foundUser);
            res.render('users/show.ejs', {
                user: foundUser,
            })
        }
    })
});






router.get('/:id/edit', (req, res) => {
	Users.findById(req.params.id, (err, foundUser) => {
		        if (err){
            console.log(err)
        } else {
		res.render('users/edit.ejs', {
			user: foundUser
		});
		}
	});
});

router.put('/:id', (req, res) => {
	Users.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, foundUser) => {
		        if (err){
            console.log(err)
        } else {
		res.redirect('/users');
		console.log(foundUser)
		}
	});
});

router.delete('/:id', (req, res) => {
	Users.findByIdAndRemove(req.params.id, (err, deletedUser) => {
		        if (err){
            console.log(err)
        } else {
		console.log(deletedUser, 'deleted User');
		}
			res.redirect('/users');
	});
});








module.exports = router;
