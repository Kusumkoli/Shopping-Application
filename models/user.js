const mongodb = require('mongodb');
const getDb = require('../utils/database').getDb;

class User {
    constructor(username, email) {
        this.name = username;
        this.email = email;
    }

    save() {
        const db = getdb();
        return db.collection('users').insertOne(this)
            .then()
            .catch();
    }

    static findById(userId) {
        const db = getdb();
        return db.collection('users').findOne({ _id: new mongodb.ObjectId(userId)});
    }
}
 
// const Sequelize = require('sequelize');
// const sequelize = require('../utils/database');

// const User = sequelize.define('user', {
//     id: {
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         allowNull: false,
//         primaryKey: true
//     },
//     name: {
//         type: Sequelize.STRING
//     },
//     email: {
//         type: Sequelize.STRING
//     }
// });

// module.exports = User;