//Modulo do mySQL
const { error } = require("console");
const mysql = require("mysql");
const dbConfig = require("../configs/db.config.js");


//cria uma conexao com o BD
const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB,
    port: dbConfig.PORT
});

//nova conexao com mysql
connection.connect(error=>{
    if(error) throw error;
    console.log("banco de dados conectado");
});
module.exports = connection;