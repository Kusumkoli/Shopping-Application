const express = require('express');

const router = express.Router();

const productsController = require('../controllers/products');

//   /admin/add-product
router.get( '/add-product', productsController.getAddProduct);


//    /admin/product
router.post( '/add-product', productsController.postAddProduct);

router.get('/products', productsController.getPro);

router.get('/cart', );

router.get('/checkout')

module.exports = router;