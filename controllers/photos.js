const express = require('express');
const router = express.Router();
const Photos = require('../models/photos');





// Index route
router.get('/', (req, res) => {
			res.render('index.ejs', {
			});
	})






module.exports = router;
