const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    port: '3000',
    database: 'shop-app',
    password: '462146214621'
});

module.exports = pool.promise();