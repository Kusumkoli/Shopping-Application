const http = require('http');  //core modules
const path = require('path');

const express = require('express'); //third party package
const bodyParser = require('body-parser');
// const routes = require('./routes');
const mongoConnect = require('./utils/database').mongoConnect;

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
    User.findById(1)
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => {
            console.log(err);
        });
    next();
});

app.use('/admin', adminRoutes);  // in case of routes which always contain /admin at the start
app.use(shopRoutes);  //order matters

app.use('/', errorController.get404Page);
    
mongoConnect(() => {
    app.listen(3010);
    console.log('Listening at Port: 3010');
});

app.listen(3010);

5ea16c7d17e119d050212baa