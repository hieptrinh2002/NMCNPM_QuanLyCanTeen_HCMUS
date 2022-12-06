const mysql = require('mysql');
require('dotenv').config();


module.exports.connectDB = () => {
    return new Promise((resolve, reject) => {

        const con = mysql.createConnection({
            // host: process.env.DB_HOST || 'localhost',
            // user: process.env.DB_USER || 'myUserName',
            // password: process.env.DB_PASS || 'mypassword',
            // database: process.env.DB_NAME || 'mydb',
            host: '127.0.0.1',
            user: 'root',
            database: 'quanlycantin_nmcnpm',
            port: "3307"
        });
        con.connect((err) => {
            if (err) {
                console.log('error!!!');
                reject(err);
            }
            resolve(con);
        });
    });
};

module.exports.closeDB = (con) => {
    console.log('close db')
    con.destroy();
};
