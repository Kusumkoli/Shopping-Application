const mongoose = require('mongoose');
const Product = require('../models/product');
const Order = require('../models/order');

exports.getProducts = (req, res, next) => {
    Product.find()
        .then(products => {
            res.render('shop/product-list', {prods: products, pageTitle: 'Products'});
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId)
        .then(product => {
            res.render('shop/product-detail', {product: product, pageTitle: 'Product Details'});
        })
        .catch(err => console.log(err));
};

exports.getIndex = (req, res, next) => {
    Product.find()
    .then(products => {
        res.render('shop/index', {prods: products, pageTitle: 'Shop'});
    })
    .catch(err => {
        console.log(err);
    });
};

exports.getCart = (req, res, next) => {
    req.user.populate('cart.items.productId').execPopulate()
        .then(user => {
            const products = user.cart.items;
            console.log(products);
            res.render('shop/cart', {pageTitle: 'My Cart', products: products});        
        })
        .catch(err => console.log(err));
};

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId)
        .then(product => {
            return req.user.addToCart(product);
        })
        .then(result => {
            console.log(result);
            res.redirect('/cart');
        })
        .catch(err => {
            console.log(err);
        });
};
         


exports.getOrders = (req, res, next) => {
    Order.find({ "user.userId" : req.user._id })
        .then(orders => {
            res.render('shop/orders', {pageTitle: 'My Orders', orders: orders});
        })
        .catch(err => {
            console.log(err);
        });
};

// exports.getCheckout = (req, res, next) => {
//     res.render('shop/checkout', {pageTitle: 'Checkout'});
// };


exports.postOrder = (req, res, next) => {
    req.user.populate('cart.items.productId').execPopulate()
        .then(result => {
            const products = result.cart.items.map(i => {
                return { quantity: i.quantity, product: { ...i.productId._doc } };
            });
            const order = new Order({
                user: {
                    name: req.user.name,
                    userId: req.user._id
                },
                products: products
            });
            return order.save();
        })
        .then(() => {
            return req.user.clearCart();
            res.redirect('/orders');
        })
        .then(() => {
           res.redirect('/orders');
       })
        .catch(err => {
            console.log(err);
        });
    
    // req.user.addOrder()
    //     
}

exports.postDeleteCartItem = (req, res, next) => {
    const prodId = req.body.productId;
    req.user.removeFromCart(prodId)
        .then(result => {
            res.redirect('/cart');
        })
        .catch(err => {
            console.log(err);
        });
}