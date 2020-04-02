const http = require('http');  //core modules

const express = require('express'); //third party package
const bodyParser = require('body-parser');
// const routes = require('./routes');

const path = require('path');

const app = express();

app.set('view engine', 'pug');  //set templaing engine
app.set('views', 'views'); //set directory path which in this case is set to 'views' by default but just in case you have to do this, you'll know how it's done

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended : false}));
app.use(express.static(path.join(__dirname, 'public'))); // to garnt read access to all files in folder public

app.use('/admin', adminRoutes.routes);  // in case of routes which always contain /admin at the start
app.use(shopRoutes);  //order matters

app.use('/', (req,res,next) => {         //setting 4040 error page
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(3000);

