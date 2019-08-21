const mysql = require('mysql')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'Luthfi',
    password : 'Luthfi123',
    database: 'moviepurwadhika',
    port: 3306
});



module.exports = db;