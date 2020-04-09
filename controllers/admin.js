const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {pageTitle : 'Add Product', editing: false});
}

exports.postAddProduct = (req, res, next) => {
    const product = new Product(req.body.title, req.body.imageURL, req.body.price, req.body.description);
    product.save();
    res.redirect('/');
}

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    const prodId = req.params.productId;
    Product.findById(prodId, product => {
        res.render('admin/edit-product', {pageTitle : 'Edit Product', product: product, edit: editMode});
    });
}

exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('admin/products', {prods: products, pageTitle: 'Admin Products'});
    });
}