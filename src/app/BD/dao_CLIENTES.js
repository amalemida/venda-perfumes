class dao_CLIENTES {
    constructor(db) {
        this._db = db;
    }

    excluirClientes(id) 
    {
        return new Promise((resolve,reject) => 
        {
            var sqlDelete = "DELETE FROM CLIENTES WHERE idCliente=" + id;
            this._db.query(sqlDelete,function(erro) {
                if (erro) {
                   console.log(erro);
                   return reject('Exclusão do cliente NÃO foi executada com sucesso');
                }
                resolve('Exclusão do cliente executada com sucesso');
            });
        });
    }
    
    incluiClientes(dados) 
    {
       return new Promise ((resolve,reject) => 
       {
        var sqlInclui = `INSERT INTO CLIENTES (nome, cpf, dataNiver, email, endereco) VALUES('${dados.nome}','${dados.cpf}','${dados.niver}','${dados.email}','${dados.endereco}')`;
        this._db.query(sqlInclui,function(erro) {
          if (erro) { 
            console.log(erro)
            return reject('Inclusão do cliente NÃO foi executada com sucesso');
          }
          resolve('Inclusão do cliente foi executada com sucesso');
        });
       });
    }

    listagemClientePorId(id) 
    {
      return new Promise ((resolve,reject) => 
      {
        this._db.query("SELECT * FROM CLIENTES WHERE idCliente=?",[id],(erro,resultado) => {
          if (erro) {
            console.log(erro);
            return reject('Erro no select * from clientes where idCliente=X');
          }
          resolve(resultado);
        });
      });
    }

    atualizaCliente(dados) 
    {
        return new Promise ((resolve,reject) => 
        {
            var sqlAtualiza = `UPDATE CLIENTES set nome='${dados.nome}', cpf='${dados.cpf}', dataNiver='${dados.niver}', email='${dados.email}', endereco='${dados.endereco}' where idCliente=${dados.id}`;
            this._db.query(sqlAtualiza,function(erro) 
            {
              if (erro) 
              { 
                 console.log(erro)
                 return reject('Alteração do cliente NÃO foi executada com sucesso');
              }
              resolve('Alteração do cliente foi executada com sucesso');
            });
        });
     }

  dadosDosClientes() 
  {
    return new Promise((resolve,reject) =>
    { 
      var sql = 'SELECT idCliente, cpf, nome , email, DATE_FORMAT(dataNiver,"%d/%m/%Y") as dataNiver, endereco FROM CLIENTES';
      this._db.query(sql, function(erro,recordset) {
        if (erro) {
          console.log(erro);
          return reject('Lista de CLIENTES FALHOU!'); 
        }
        resolve(recordset);
      });
    });
  }
}

module.exports = dao_CLIENTES;