const http = require('http');  //core modules

const express = require('express'); //third party package
const bodyParser = require('body-parser');
// const routes = require('./routes');

const path = require('path');

const app = express();

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended : false}));
app.use(express.static(path.join(__dirname, 'public'))); // to garnt read access to all files in folder public

app.use(adminRoutes);  // in case of routes which always contain /admin at the start
app.use(shopRoutes);  //order matters

app.use('/', (req,res,next) => {         //setting 4040 error page
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(3000);

