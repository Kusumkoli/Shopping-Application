const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('shop/product-list', {prods: products, pageTitle: 'Products'});
    });
    //res.sendFile(path.join(__dirname, '../', 'views', 'shop.html')); //gives us the path from shop.js to shop.html and not the absolute path
};

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    console.log(prodId);
    Product.findById(prodId, product => {
        console.log(product);
        res.render('shop/product-detail', {product: product, pageTitle: 'Product Details'});
    });
};

exports.getIndex = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('shop/index', {prods: products, pageTitle: 'Shop'});
    });
};

exports.getCart = (req, res, next) => {
    Cart.getCart(cart => {
        Product.fetchAll(products => {
            const cartProducts = [];
            for(product of products) {
                const cartProductData = cart.products.find(prod => prod.id === product.id);
                if(cartProductData) {
                    cartProducts.push({productData: product, qty: cartProductData.qty});
                }
            }
            res.render('shop/cart', {pageTitle: 'My Cart', products: cartProducts});
        });
    }); 
};

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId, (product) => {
        Cart.addProduct(prodId, product.price);
    });
    res.redirect('/cart');
};

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {pageTitle: 'My Orders'});
};

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {pageTitle: 'Checkout'});
};

exports.postDeleteCartItem = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId, product => {
        Cart.deleteProduct(prodId, product.price);
        res.redirect('/cart');
    });
}