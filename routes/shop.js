const express = require('express');

const path = require('path'); //helps us define the path for linking easily

const router = express.Router();

router.get( '/',(req, res, next) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'shop.html')); //gives us the path from shop.js to shop.html and not the absolute path
});

module.exports = router;