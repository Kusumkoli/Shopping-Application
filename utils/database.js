const Sequelize = require('sequelize');
const sequelize = new Sequelize('shop-app','root','462146214621', {
    dialect: 'mysql',
    host: 'localhost',
    port: '3000'
}); 

module.exports = sequelize;


// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;

// const mongoConnect = () => {
//     MongoClient.connect('mongodb+srv://kusumkoli:eJL107UOgWaBZyaq@cluster0-h9zxf.mongodb.net/test?retryWrites=true&w=majority', {useUnifiedTopology: true, useNewUrlParser: true})
//     .then(client => {
//         console.log('Connected to mongoDB');
//         callback(client);
//     })
//     .catch(err => {
//         console.log(err);
//     });
// };

// module.exports = mongoConnect;