const mongodb = require('mongodb');
const getDb = require('../utils/database').getDb;

class Product {
    constructor(title, imageURL, price, description, id, userId) {
        this.title = title;
        this.imageURL = imageURL;
        this.price = price;
        this.description = description;
        this._id = id ? new mongodb.ObjectId(id) : null;
        this.userId = userId;
    }

    save() {
        const db = getDb();
        let dbOp;
        
        if(this._id) {
            dbOp = db.collection('products').updateOne({ _id: this._id }, {$set: this});  //first parameter to define which product to update and second to define what valus of object to update
        }
        else {
            dbOp = db.collection('products').insertOne(this);
        }
        return dbOp
            .then(result => {
                console.log(result);
            })
            .catch(err => console.log(err));
    }

    static fetchAll() {
        const db = getDb();
        return db.collection('products').find().toArray()
            .then(products => {
                console.log(products);
                return products;
            })
            .catch(err => {
                console.log(err);
            });
    }

    static findById(prodId) {
        const db = getDb();
        return db.collection('products').find({ _id: new mongodb.ObjectId(prodId)}).next() //find gives us a cursor so next() indicates the last object in the result
            .then(product => {
                console.log(product);
                return product;
            })
            .catch(err => {
                console.log(err);
            });
    }

    static deleteById(prodId) {
        const db = getDb();
        return db.collection('products').deleteOne({ _id : new mongodb.ObjectId(prodId)})
            .then(product => {
                console.log('Product Deleted');
            })
            .catch(err => {
                console.log(err);
            });
    }
};

module.exports = Product;

// const Sequelize = require('sequelize');
// const sequelize = require('../utils/database');

// const Product = sequelize.define('product', {
//     id: {
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         allowNull: false,
//         primaryKey: true
//     },
//     title: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     price: {
//         type: Sequelize.DOUBLE,
//         allowNull: false
//     },
//     imageURL: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     description: {
//         type: Sequelize.STRING,
//         allowNull: false
//     }
// });
