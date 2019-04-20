const express = require('express');
const router = express.Router();
const photo = require('../models/photo/photo');
const photographer = require('../models/photographer/photographer')

//index route
//get the request from the client
router.get('/', (req, res) => {
    //query the db to find photo
    photo.find({}, (err, photoFromTheDatabase) => {
        //send the photo to an ejs page that will display the data according to an ejs template 
        res.render('photo/index.ejs', {
            //inject the template with the variable found from the db -- becomes new variable on in the template 
            photoOnTheTemplate: photoFromTheDatabase
        })
    })
})
//new route
//get a request for a new photo from the client
router.get('/new', (req, res) => {
    //search the db for created photo from the post route
    photographer.find({}, (error, allphotographer) => {
        //check for errors
        if (error) {
            res.send(error)
        } else {
            //if no error respond to the client with an ejs page that shows created photo
            res.render('photo/new.ejs', {
                //inject the variable onto the ejs page
                photographerOnTemplate: allphotographer
            })
        }
    })

})

//show page
// client requests to see a photo
router.get('/:id', (req, res) => {
    //find the photo in the db using 
    photo.findById(req.params.id, (err, photoFromTheDatabase) => {
        //check the database to see if the photo belongs to a photographer        
        photographer.findOne({
            "photo": req.params.id
        }, (err, photographer) => {
            res.render('photo/show.ejs', {
                //inject the template with the photo variable and id of it's owner
                photoOnTheTemplate: photoFromTheDatabase,
                photographer: photographer
            });
        })
    })
})

//edit route
//client requests to edit a photo
router.get('/:id/edit', (req, res) => {
    //search the db for the requested photo
    photo.findById(req.params.id, (err, photoFromTheDatabase) => {
        //search the db for the photo owner
        photographer.find({}, (err, photographerFromTheDatabase) => {
            res.render('photo/edit.ejs', {
                //inject the edit page with the variables for the photo and its owner
                photoOnTheTemplate: photoFromTheDatabase,
                photographerOnTemplate: photographerFromTheDatabase
            });
        })

    })
})

//create/post route
//receives the req.body information from the form on the ejs
router.post('/', (req, res) => {
    console.log(req.body);
    //create a brand new photo with the information from the form
    //form 'name' attributes match the photochema
    photo.create(req.body, (err, newlyCreatedphoto) => {
        console.log(`Created a photo for photographer ${req.body.photographerId}`);
        //find the photographer from the input in the ejs
        photographer.findById(req.body.photographerId, function (err, photographerFound) {
            //add the unique id from the photographer to the created photo object
            photographerFound.photo.push(newlyCreatedphoto._id);
            //save changes because we mutated an array in a DB
            photographerFound.save((err, savedphotographer) => {
                console.log(savedphotographer);
                //send the client to the photo page
                res.redirect('/photo')
            });
        });

    })
})
//update/put route
//req.body information received from edit.ejs
router.put('/:id', (req, res) => {
    console.log(req.body);
    //find the photo that the client requested to change in the db
    photo.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    }, (err, updatedphoto) => {
        //find the owner of the photo by querying the db for the photo key with the targeted value
        photographer.findOne({
            'photo': req.params.id
        }, (err, foundphotographer) => {
            //if the owner id matched the form (or does not not match it), 
            if (foundphotographer._id.toString() !== req.body.photographerId) {
                //remove the photo from the photographer's object
                foundphotographer.photo.remove(req.params.id);
                //save since we mutated an array on the db
                foundphotographer.save((err, savedFoundphotographer) => {
                    //find the photographer with the photo's reference in its object
                    photographer.findById(req.body.photographerId, (err, newphotographer) => {
                        //push the new photo id to the photographer reference
                        newphotographer.photo.push(updatedphoto._id);
                        //save mutated array
                        newphotographer.save((err, savedNewphotographer) => {
                            //redirect the route to photo show page
                            res.redirect('/photo/' + req.params.id);
                        })
                    })
                })
            } else {
                //redirect if the owners id does not match the information on req.body (photo reference in the owners object)
                res.redirect('/photo/' + req.params.id)
            }
        })
    });
});
//delete route
//client requests to delete a photo (input from button on an ejs page)
router.delete('/:id', (req, res) => {
    //find the requested photo and delete it....but wait with a call back for the photographer information
    photo.findByIdAndDelete(req.params.id, (err, photoFromTheDatabase) => {
        console.log(photoFromTheDatabase);
        //find the photo owner based on a db search of the photo object
        photographer.findOne({
            'photo': req.params.id
        }, (err, foundphotographer) => {
            if (err) {
                console.log(err)
            } else {
                console.log(foundphotographer);
                //remove the photographer reference from the photo object
                foundphotographer.photo.remove(req.params.id);
                //save because we mutated an array
                foundphotographer.save((err, updatedphotographer) => {
                    console.log(updatedphotographer);
                    //redirect to the photo index
                    res.redirect('/photo');
                })
            };
        });
    });
});
//export the router




module.exports = router;