const express = require('express');
const router = express.Router();
const Photo = require('../models/Photo');
const User = require('../models/User');

//index route- show all the Photos
router.get('/' , (req, res) => {
    Photo.find({}, (err, foundPhotos) => {
      console.log(foundPhotos);
        if(err){
            res.send(err)
        }else{
            res.render('photo/index.ejs', {
                photoz : foundPhotos
        })
     }
    });
});

//new route
router.get('/new', (req, res) => {
    User.find({}, (err, allUsers) =>{
        if(err){
            res.send(err);
        }else{ 
            res.render('photo/new.ejs', {
            userOnTemplate: allUsers  
        });
        }
    });
});



// // photos show route 
router.get('/:id', (req, res) => {
  Photo.findById(req.params.id, (err, foundPhotos) => {
    console.log('Here it isSsssss');
    console.log(foundPhotos); 
      User.findOne({
        "username": foundPhotos.username
    }, (err, allUsers) => {
        res.render('photo/show.ejs', {
          userOnTemplate: allUsers,
          photoz: foundPhotos
            
        });
    })
  
  })
})

//photo EDIT ROUTE 
router.get('/:id/edit', (req, res)=>{
    Photo.findById(req.params.id, (err, foundPhotos)=>{
        User.find({}, (err, usersFromTheDatabase)=>{
            res.render('photo/edit.ejs', {
                photoOnTemplate: foundPhotos,
                userOnTemplate: usersFromTheDatabase
            });
        })

    })
})


//photos Create route
router.post('/', (req, res)=>{ 
  Photo.create(req.body, (err, createdPhoto)=>{
    console.log(createdPhoto)
    console.log(req.body.username);
    if(err){
      res.send(err);
    } else {
      User.findById(req.body.username, (err, foundUser) => {
        console.log(foundUser);
        foundUser.photo.push(createdPhoto);
        foundUser.save((err, savedUser) => {
          res.redirect('/photo');
        });
      });
    }
  });
});

//failed attempt at put route without using async await 
// router.put('/:id', (req, res)=>{
//   console.log(req.body, 'this is req.body');
//   Photo.findByIdAndUpdate(req.params.id, req.body, {new: true},(err, updatedPhoto)=>{
//     console.log(req.params.id, 'req.params.id before');
//     User.findOne({'photo': req.params.id}, (err, userFound) => {
//       console.log(req.params, 'this is only req.params')
//       if(userFound._id.toString() !== req.body.userId){
//         console.log(userFound._id, 'foundUser')
//         console.log(req.body.user, 'req.body.user')
//         userFound.photo.remove(req.params.id);
//         userFound.save((err, savedUserFound) => {
//           User.findById(req.body.userId, (err, newUser) => {
//             newUser.photo.push(updatedPhoto._id);
//             newUser.save((err, savedNewUser) => {
//               res.redirect('/photo/' + req.params.id)
//               console.log('hitting else')
//             })
//           })
//         })

//       } else {
//         res.redirect('/photo/' + req.params.id)
//         console.log('hitting else')
//       }
//     })
//   });
// });



//Photo update route
router.put("/:id", async (req,res)=>{

  try{

      
 const updatedPhoto = await Photo.findByIdAndUpdate(req.params.id, req.body, {new:true});
 const foundUser = await User.findOne({
     'photo': req.params._id,
 });
  console.log(updatedPhoto + '<== newly updated order after')
  res.redirect('/photo');
  console.log(foundUser + '<== found user after saved array')

  }catch(err){
      console.log(err)
      res.send(err);
  }
});



router.delete('/:id', async (req,res)=>{

    try{

      const deletedPhoto = await Photo.findByIdAndRemove(req.params.id);
      const foundUser = await User.findOne({
          'photo': req.params.id
      });
      foundUser.photo.remove(req.params.id)
      foundUser.save(foundUser.photo)
      res.redirect('/photo');
    }catch(err){
        res.send(err)
    }
    
})

// router.delete('/:id', async (req, res)=>{
//   // Delete the article, is the purpose of line 153
//   try {
//         // Once again we are defining both are database queries, that
//         // are not dependant on each other (the results don't depend on each other)
//         // and we just have to await Promise.all below for them to finish
//         // so we can remove the article from the author? Why do we have to do this?
//         const deletePhoto = Photo.findByIdAndRemove(req.params.id);
//         const findUser    = User.findOne({'photoz': req.params.id});

//         const [deletedPhoto, foundUser] = await Promise.all([deletePhoto, findUser]);

//         // Why do we have to find the author
//         // then remove the article from the foundAuthor document?
//         // If we remove an article from the Article COllection,
//         // does it automatically remove from the author collection?
//         foundUser.photoz.remove(req.params.id);
//         // Don't forget to save! the document back to the database
//         await foundUser.save();
//         console.log('happening ')
//         res.redirect('/photo', {
//         photoz: foundPhotos
//         });

//     } catch(err){

//       console.log(err)
//       res.send(err);
//     }
// });














module.exports = router;