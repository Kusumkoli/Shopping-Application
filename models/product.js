//const fs = require('fs');
//const path = require('path');
const db = require('../utils/database');

const Cart = require('./cart');

// const p = path.join(
//     path.dirname(process.mainModule.filename), 
//     'data', 
//     'products.json'
// );

// const getProductsFromFile = (cb) => {    //helper function which is used multiple times i.e in save and fetch
//     fs.readFile(p, (err, fileContent) => {
//         if(err) {
//             cb([]);
//         } 
//         else {
//             cb(JSON.parse(fileContent));
//         } 
//     });
// };

module.exports = class Product {
    constructor(id, title, imageURL, price, description) {
        this.id = id;
        this.title = title;
        this.imageURL = imageURL;
        this.price = price;
        this.description = description; 
    }

    save() {
        return db.execute(
            'INSERT INTO products (title, price, description, imageURl) VALUES(?,?,?,?)',
            [this.title, this.price, this.description, this.imageURL]
        );
    };

    static DeleteById(id) {
        
    };

    static fetchAll() {
        return db.execute('SELECT * FROM products');
    };

    static findById(id) {
        return db.execute('SELECT * FROM products WHERE products.id = ?', [id]);
    };
}