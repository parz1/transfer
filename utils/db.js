var mysql = require("mysql");
var config = {
    host: 'localhost',
    port: 3306,
    database: 'no4get',
    user: 'root',
    password: '123',
    multipleStatements: true
};

module.exports = {
    query: (sql, params) => {
        return new Promise((resolve, reject) => {
            var connection = mysql.createConnection(config);
            console.log("start connection...");
            connection.connect((err) => {
                //console.log("connecting...")
                if (err) {
                    console.log("connecting failed!");
                    reject(err);
                }
            })
            connection.query(sql, params, (err, res, field) => {
                if (err) {
                    console.log('operate mysql failed!');
                    reject(err);
                }
                //console.log("SUCCESS! YOUR DATA IS - " + res);
                resolve(res);
            })
            connection.end((err => {
                if (err) {
                    console.log('close connection failed!');
                    reject(err);
                }
            }))
        })

    }
}