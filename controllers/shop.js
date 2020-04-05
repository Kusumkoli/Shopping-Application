const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('shop/product-list', {prods: products, pageTitle: 'Shop'});
    });
    //res.sendFile(path.join(__dirname, '../', 'views', 'shop.html')); //gives us the path from shop.js to shop.html and not the absolute path
}

exports.getIndex = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('shop/index', {prods: products, pageTitle: 'Shop'});
    });
}

exports.getCart = (req, res, next) => {
    res.render('shop/cart', {pageTitle: 'My Cart'});
}

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {pageTitle: 'My Orders'});
}

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {pageTitle: 'Checkout'});
}