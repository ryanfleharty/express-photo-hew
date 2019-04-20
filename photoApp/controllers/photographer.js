const express = require('express');
const router = express.Router();
const photo = require('../models/photo/photo');
const photographer = require('../models/photographer/photographer')


//client requests to see photographer
router.get('/', (req, res) => {
    //find phphotographer
    photographer.find({}, (err, photographer) => {
        //render photographer to ejs page
        res.render('photographer/index.ejs', {
            //inject variable for ohotographer to use on ejs page
            photographer: photographer
        })
    })
})

//new route 
//recieve request from client to show new/create page
router.get('/new', (req, res) => {
    //render the new ohotographer template 
    res.render('photographer/new.ejs');
})
//show ohotographer page
//client requests to see specific ohotographer 
router.get('/:id', (req, res) => {
    //find the requested ohotographer in the db
    photographer.findById(req.params.id)
        //check the db to see populate photo based on the id of the cat reference in the ohotographer object 
        .populate('photo')
        //executes the request.  waits on the ohotographer information
        .exec((err, photographer) => {
            if (err) {
                //check for error
                res.send(err);
                //render the show template
            } else {
                res.render('photographer/show.ejs', {
                    //inject the variables to the template
                    photographer: photographer
                });
            }

        })
})

//find the ohotographer requested from the client in the db based on edit request input 
router.get('/:id/edit', (req, res) => {
    photographer.findById(req.params.id, (err, photographer) => {
        //serve the edit template 
        res.render('photographer/edit.ejs', {
            //inject the variables
            photographer: photographer
        })
    })
})
//create/post route
//post the information received from the new template form
router.post('/', (req, res) => {
    //create new photographer in the db 
    photographer.create(req.body, (err, photographer) => {
        console.log(photographer)
        //redirect to photographer page
        res.redirect('/photographer')
    })
})
//update/put
//find the requested photographer from the edit form
router.put('/:id', (req, res) => {
    //update information based on form from edit template
    photographer.findByIdAndUpdate(req.params.id, req.body, (err, photographer) => {
        console.log(photographer);
        //redirect client to photographer page
        res.redirect('/photographer');
    })
})
//delete route
router.delete('/:id', (req, res) => {
    //identify the photographer in the db
    photographer.findByIdAndDelete(req.params.id, (err, photographer) => {
        console.log(photographer);
        //delete photographer's photo in the db
        Cat.deleteMany({
            //find the photo unique id
            _id: {
                //use mongo command to delete photographer reference from cat object array
                $in: photographer.photo
            }
            //now that the photographer reference is deleted, delete the cat, unless there is an error
        }, (err, data) => {
            console.log(data);
            //redirect to photographer page
            res.redirect('/phphotographer');
        })
    })
})

module.exports = router;