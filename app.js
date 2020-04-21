const http = require('http');  //core modules
const path = require('path');

const express = require('express'); //third party package
const bodyParser = require('body-parser');
// const routes = require('./routes');


const app = express();


const sequelize = require('./utils/database');
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cartItem');

app.set('view engine', 'ejs');  //set templaing engine
app.set('views', 'views'); //set directory path which in this case is set to 'views' by default but just in case you have to do this, you'll know how it's done

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorController = require('./controllers/error');

app.use(bodyParser.urlencoded({extended : false}));
app.use(express.static(path.join(__dirname, 'public'))); // to garnt read access to all files in folder public

app.use((req,res,next) => {
    User.findByPk(1)
        .then(user => {
            req.user = user;
            // console.log(req.user);
            next();
        })
        .catch(err => {
            console.log(err);
        });
});

app.use('/admin', adminRoutes);  // in case of routes which always contain /admin at the start
app.use(shopRoutes);  //order matters

app.use('/', errorController.get404Page);


Product.belongsTo(User, {constraints:true, onDelete:'CASCADE'}); //will add user id to product
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, {through: CartItem});
Product.belongsToMany(Cart, {through: CartItem});

//
sequelize.sync()
    .then(result => {
        return User.findByPk(1); 
    })
    .then(user => {
        if(!user) {
            return User.create({name: 'Kusum', email:'admin1234@gmail.com'});
        }
        return user;
    })
    .then(user => {
        return user.createCart();
    })
    .then(cart => {
        //console.log(user);
        app.listen(3010);
    })
    .catch(err => {
        console.log(err);
    });

    
// mongoConnect(client => {
//     console.log(client);
//     app.listen(3010);
// });