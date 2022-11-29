class dao_CLIENTES {
    // construtor da classe
    // objetiva é criar a conexão com o BD
    constructor(db) {
        // _db = atributo da classe dao_CLIENTES
        // db = parâmetro do construtor
        this._db = db;
    }

    // método que fará o SELECT da tabela CLIENTES
    excluirClientes(id) 
    {
        return new Promise((resolve,reject) => 
        {
            var sqlDelete = "DELETE FROM CLIENTES WHERE idClie=" + id;
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
        var sqlInclui = "INSERT INTO CLIENTES (nomeClie,cpfClie,dataNiverClie,emailClie) VALUES('" +
           dados.nome + "','" + dados.cpf + "','" + dados.niver + "','" 
           + dados.email + "')";
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
        //var sqlConsultaCliePorID = "SELECT * FROM CLIENTES WHERE idClie=" + id;
        //this._db.query(sqlConsultaCliePorID,(erro,resultado) => {
        this._db.query("SELECT * FROM CLIENTES WHERE idClie=?",[id],(erro,resultado) => {
          if (erro) {
            console.log(erro);
            return reject('Erro no select * from clientes where idClie=X');
          }
          resolve(resultado);
        });
      });
    }

  
    atualizaCliente(dados) 
    {
        return new Promise ((resolve,reject) => 
        {
            var sqlAtualiza = "UPDATE CLIENTES set nomeClie='" + dados.nome + "', cpfClie='" + dados.cpf + 
            "', dataNiverClie='" + dados.niver + "', emailClie='" + dados.email + "' where idClie=" + 
            dados.id;
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

  dadosDosClientesEJS() 
  {
    return new Promise((resolve,reject) =>
    { 
      var sql = 'SELECT idCliente, cpf, nome , email, DATE_FORMAT(dataNiver,"%d/%m/%Y") as dataNiver FROM CLIENTES';
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