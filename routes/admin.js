const express = require('express');

const router = express.Router();

const adminController = require('../controllers/admin');

//   /admin/add-product
router.get( '/add-product', adminController.getAddProduct);

//    /admin/product
router.post( '/add-product', adminController.postAddProduct);

router.get('/edit-product/:productId', adminController.getEditProduct);

router.post('/edit-product', adminController.postEditProduct);

router.post('/delete-product', adminController.postDeleteProduct);

//    /admin/products
router.get('/products', adminController.getProducts);
 
module.exports = router;