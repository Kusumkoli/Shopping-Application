const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product', {pageTitle : 'Add Product'});
}

exports.postAddProduct = (req, res, next) => {
    const product = new Product(req.body.title, req.body.imageURL, req.body.price, req.body.description);
    product.save();
    res.redirect('/');
}

exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('admin/products', {prods: products, pageTitle: 'Admin Products'});
    });
}