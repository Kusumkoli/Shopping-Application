const express = require('express');

const router = express.Router();

const path = require('path');

const product = [];
//   /admin/add-product
router.get( '/add-product',(req, res, next) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'add-product.html'));
});


//    /admin/product
router.post( '/add-product',(req, res, next) => {
    product.push({title: req.body.title});
    res.redirect('/');
});

module.exports = {
    routes: router,
    products: product
};