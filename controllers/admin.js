const Product = require('../models/product');
const User = require('../models/user');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {pageTitle : 'Add Product', edit: false});
}

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageURL = req.body.imageURL;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product(title, imageURL, price, description);
    product.save()
        .then(result => {
            console.log('Added new product.');
            res.redirect('/admin/products');
        })
        .catch(err => {
            console.log(err);
        });
}

// exports.getEditProduct = (req, res, next) => {
//     const editMode = req.query.edit;
//     const prodId = req.params.productId;
//     req.user.getProducts({where: {id:prodId}})
//     //Product.findByPk(prodId)
//         .then( product => {
//             return product.userId = req.user.id;
//         })
//         .then(product => {
//             res.render('admin/edit-product', {pageTitle : 'Edit Product', product: product, edit: editMode});
//         })
//         .catch(err => {
//             console.log(err);
//         });
// };

// exports.postEditProduct = (req, res, next) => {
//     const prodId = req.body.productId;
//     const updatedTitle = req.body.title;
//     const updatedImageURL = req.body.imageURL;
//     const updatedPrice = req.body.price;
//     const updatedDesc = req.body.description;
//     Product.findByPk(prodId)
//         .then(product => {
//             product.title = updatedTitle;
//             product.imageURL = updatedImageURL;
//             product.price = updatedPrice;
//             product.description = updatedDesc;
//             product.save();
//         })
//         .then(result => {
//             console.log('Updated Product');
//             res.redirect('/admin/products');
//         })
//         .catch(err => {
//             console.log(err);
//         });
// };

// exports.postDeleteProduct = (req, res, next) => {
//     const prodId = req.body.productId;
//     Product.findByPk(prodId)
//         .then(product => {
//             return product.destroy();
//         })
//         .then(result => {
//             console.log('Product Deleted');
//             res.redirect('/admin/products');
//         })
//         .catch(err => {
//             console.log(err);
//         })
// };

// exports.getProducts = (req, res, next) => {
//     req.user.getProducts()
//         .then(products => {
//         res.render('admin/products', {prods: products, pageTitle: 'Admin Products'});
//         })
//         .catch(err => {
//             console.log(err);
//         });
// };