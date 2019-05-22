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



// router.delete('/:id', async (req,res)=>{

//     try{

//       const deletedPhoto = await Photo.findByIdAndRemove(req.params.id);
//       const foundUser = await User.findOne({
//           'photo': req.params.id
//       });
//       foundUser.photo.remove(req.params.id)
//       foundUser.save(foundUser.photo)
//       res.redirect('/photo');
//     }catch(err){
//         res.send(err)
//     }
    
// })

router.delete('/:id', (req, res) => {

  Photo.findByIdAndDelete(req.params.id, (error, deletedPhotoFromDb) => {
      if (error){
          res.send(error)
      } else {
          User.findOne({'photo': req.params.id}, (error, foundUser) => {
              if(error){
                  res.send(error);
              } else {
                  foundUser.photos.remove(req.params.id);
                  foundUser.save((error, updatedUser) => {
                      console.log(updatedUser);
                      res.redirect('/photo')
                  })
              }
          })
      }
  });
});

module.exports = router;