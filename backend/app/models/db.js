const mysql = require("mysql");
const dbConfig = require("../configs/db.config.js");

const connection=mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB,
    port: dbConfig.PORT
});

connection.connect(error=>{
    if (error) throwerror;
    console.log("Banco de Dados Conectado!");
});
module.exports = connection;