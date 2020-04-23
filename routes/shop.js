const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

router.get( '/', shopController.getIndex);

router.get('/products', shopController.getProducts);

router.get('/products/:productId', shopController.getProduct);  // ':' colon means that productID is a variable and can contain any value that is passed into the router

// router.get('/cart', shopController.getCart);

// router.post('/cart', shopController.postCart);

// router.post('/delete-cart-item', shopController.postDeleteCartItem);

// router.get('/orders', shopController.getOrders);

// router.get('/checkout', shopController.getCheckout);

module.exports = router;