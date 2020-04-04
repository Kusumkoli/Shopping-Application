const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product', {pageTitle : 'Add Product'});
}

exports.postAddProduct = (req, res, next) => {
    const product = new Product(req.body.title);
    Product.save();
    res.redirect('/');
}

exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('shop/product-list', {prods: products, pageTitle: 'Shop'});
    });
    //res.sendFile(path.join(__dirname, '../', 'views', 'shop.html')); //gives us the path from shop.js to shop.html and not the absolute path
}