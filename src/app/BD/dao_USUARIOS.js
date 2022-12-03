class dao_USUARIOS {
    // construtor da classe
    // objetiva é criar a conexão com o BD
    constructor(db) {
        // _db = atributo da classe dao_CLIENTES
        // db = parâmetro do construtor
        this._db = db;
    }

    validaAcesso(login,senha) 
    {
      return new Promise ((resolve,reject) => 
      {
        var sqlConsultaAcesso = `SELECT * FROM USUARIOS WHERE EMAILUSR='${login}' AND SENHAUSR='${senha}'`;
        this._db.query(sqlConsultaAcesso,(erro,resultado) => {
          if (erro) {
            console.log(erro);
            return reject('Erro na validação no acesso do usuário');
          }
          resolve(resultado);
        });
      });
    }

}

module.exports = dao_USUARIOS;