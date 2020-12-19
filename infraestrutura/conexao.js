const mysql = require('mysql')

const conexao = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'jdc',
    password :'jho,.;123',
    database: 'petshop'
})


module.exports = conexao