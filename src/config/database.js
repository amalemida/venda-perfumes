const mysql = require('mysql2');

const connection = mysql.createConnection({
        host     : 'regulus.cotuca.unicamp.br',
        user     : 'BD22529',
        password : 'BD22529',
        database : 'BD22529'
});

connection.connect(function(err) {
    if (err) throw err;
      console.log('CONEXÃO com BD BD22529 OK!');
});

module.exports = connection;
