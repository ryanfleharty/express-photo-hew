const express = require('express');
const router = express.Router();
const User = require('../models/users');




router.get ('/new', (req, res) =>{
	res.render('new.ejs')	

})
 // INDEX ROUTE

router.get ('/', (req, res)=>{
	Users.find{}, (err, allUsers)=>{
	   if(err){
	   	console.log(err)
	   	res.send(err)
	   }else{
	   	comsole.log(allUsers)
	   	res.render('index.ejs', {user: allUsers});
	   }
     }
});
// NEW ROUTE

router.post('/', (req, res) => {
    User.create(req.body, (err, madeUser) =>{
        if(err){
            console.log(err); 
            res.send(err);
        } else {
            console.log (madeUser);
            res.redirect('/users')
        }
    })
});

// SHOW ROUTE

router.get('/:id', (req, res) =>{
	User.findById(req.params.id, (err, foundUser) =>{
		if(err){
			console.log(err);
		} else {
			res.render('show.ejs', {user: foundUser})
		}
	})
});

// UPDATE ROUTE

router.put('/:id', (req, res)=>{
	User.findByIdAndUpdate(req.params.id, req.body, (err, updatedUser)=>{
		if(err){
			console.log(err);
		} else {
			console.log(updatedUser);
			res.redirect('/users', {user: updatedUser})
		}
	})
})

// DELETE ROUTE


router.delete('/:id', (req, res) =>{
	User.findByIdAndDelete(req.params.id, (err, deletedUser)=>{
		if(err){
			console.log(err);
			res.send(err);
		} else {
			console.log(deletedUser);
			res.redirect('/users')
		}
	})
})











module.exports = router;