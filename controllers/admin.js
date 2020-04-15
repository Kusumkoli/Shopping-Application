const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {pageTitle : 'Add Product', edit: false});
}

exports.postAddProduct = (req, res, next) => {
    const product = new Product(null, req.body.title, req.body.imageURL, req.body.price, req.body.description);
    product.save()
        .then(() => {
                res.redirect('/');
            }
        )
        .catch(err => console.log(err));
}

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    const prodId = req.params.productId;
    Product.findById(prodId, product => {
        res.render('admin/edit-product', {pageTitle : 'Edit Product', product: product, edit: editMode});
    });
}

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedImageURL = req.body.imageURL;
    const updatedPrice = req.body.price;
    const updatedDesc = req.body.description;
    const updatedProduct = new Product(prodId, updatedTitle, updatedImageURL, updatedPrice, updatedDesc);
    updatedProduct.save();
    res.redirect('/admin/products');
};

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.DeleteById(prodId);
    res.redirect('/admin/products');
};

exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('admin/products', {prods: products, pageTitle: 'Admin Products'});
    });
}