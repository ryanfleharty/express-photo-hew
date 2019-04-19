const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();


//INDEX:
router.get('/', (req, res) => {
    res.render('./users/index.ejs');
});


router.get('/new', (req, res) => {
    res.render('./users/new.ejs');
});











module.exports = router