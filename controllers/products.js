const products = [];

exports.getAddProduct = (req, res, next) => {
    res.render('add-product', {pageTitle : 'Add Product'});
}

exports.postAddProduct = (req, res, next) => {
    product.push({title: req.body.title});
    res.redirect('/');
}

exports.getProducts = (req, res, next) => {
    //res.sendFile(path.join(__dirname, '../', 'views', 'shop.html')); //gives us the path from shop.js to shop.html and not the absolute path
    res.render('shop', {prods: products, pageTitle: 'Shop'});
}