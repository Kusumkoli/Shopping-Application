const http = require('http');  //core modules
const path = require('path');

const express = require('express'); //third party package
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// const routes = require('./routes');


const User = require('./models/user');

const app = express();


app.set('view engine', 'ejs');  //set templaing engine
app.set('views', 'views'); //set directory path which in this case is set to 'views' by default but just in case you have to do this, you'll know how it's done

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorController = require('./controllers/error');

app.use(bodyParser.urlencoded({extended : false}));
app.use(express.static(path.join(__dirname, 'public'))); // to garnt read access to all files in folder public

app.use(( req, res, next) => {
    User.findById("5ea2ee10b1b4d507245aa9e7")
        .then(user => {
            req.user = user;
            console.log(req.user);
            next();
        })
        .catch(err => {
            console.log(err);
        });
});

app.use('/admin', adminRoutes);  // in case of routes which always contain /admin at the start
app.use(shopRoutes);  //order matters

app.use('/', errorController.get404Page);
    
mongoose.connect('mongodb+srv://kusumkoli:eJL107UOgWaBZyaq@cluster0-h9zxf.mongodb.net/shop?retryWrites=true&w=majority', {useUnifiedTopology: true, useNewUrlParser: true})
    .then(result => {
        User.findOne().then(user => {
            if(!user) {
                const user = new User({
                    name: 'Admin',
                    email: 'admin1234@gmail,com',
                    cart: {
                        items: []
                    }
                });
                user.save();
            }
        });
        app.listen(3010);
        console.log('Listening at Port 3010');
    })
    .catch(err => {
        console.log(err);
    });
