const express = require('express');
const router = express.Router();
const User = require('../../models/users/userSchema');
const Photo = require('../../models/photos/photoSchema');



//INDEX:
router.get('/', (req, res) => {
    res.render('photos/index.ejs');
});






module.exports = router;