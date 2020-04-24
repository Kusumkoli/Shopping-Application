const Product = require('../models/product');
//const User = require('../models/user');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {pageTitle : 'Add Product', edit: false});
}

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageURL = req.body.imageURL;
    const price = req.body.price;
    const description = req.body.description;
    const userId = req.user._id;
    const product = new Product({ title: title, imageURL: imageURL, price: price, description: description, userId: userId});
    product.save()
        .then(() => {
            console.log('Added new product.');
            res.redirect('/admin/products');
        })
        .catch(err => {
            console.log(err);
        });
}

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    const prodId = req.params.productId;
    Product.findById(prodId)
        .then( product => {
            console.log(product);
            return product;
        })
        .then(product => {
            res.render('admin/edit-product', {pageTitle : 'Edit Product', product: product, edit: editMode});
        })
        .catch(err => {
            console.log(err);
        });
};

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedImageURL = req.body.imageURL;
    const updatedPrice = req.body.price;
    const updatedDesc = req.body.description;
    Product.findById(prodId)
        .then(product => {
            product.title = updatedTitle;
            product.imageURL = updatedImageURL;
            product.price = updatedPrice;
            product.description = updatedDesc;
            return product.save();
        })
        .then(result => {
            console.log('Updated Product');
            res.redirect('/admin/products');
        })
        .catch(err => {
            console.log(err);
        });
};

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findByIdAndRemove(prodId)
        .then(() => {
            console.log('Product Deleted');
            res.redirect('/admin/products');
        })
        .catch(err => {
            console.log(err);
        })
};

exports.getProducts = (req, res, next) => {
    Product.find()
    //.populate('userId')
        .then(products => {
            console.log(products);
            res.render('admin/products', {prods: products, pageTitle: 'Admin Products'});
        })
        .catch(err => {
            console.log(err);
        });
};