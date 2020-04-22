const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db; 

const mongoConnect = () => {
    MongoClient.connect('mongodb+srv://kusumkoli:eJL107UOgWaBZyaq@cluster0-h9zxf.mongodb.net/shop?retryWrites=true&w=majority', {useUnifiedTopology: true, useNewUrlParser: true})
        .then(client => {
            console.log('Connected to mongoDB');
            //console.log(client);
            _db = client.db();
        })
        .catch(err => {
            console.log(err);
        });
};

const getDb = () => {
    if(_db) {
        return _db;
    }
    else {
        console.log('No database Found');
    }
};

module.exports = {
    mongoConnect: mongoConnect,
    getDb : getDb
}   


