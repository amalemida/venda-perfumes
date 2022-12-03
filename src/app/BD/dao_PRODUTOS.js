class dao_PRODUTOS {
  // construtor da classe
  // objetiva é criar a conexão com o BD
  constructor(db) {
    // _db = atributo da classe dao_CLIENTES
    // db = parâmetro do construtor
    this._db = db;
  }

  dadosDosProdutos() {
    return new Promise((resolve, reject) => {
      var sql =
        "SELECT idProduto, descricao, quantidade, Concat('R$ ',FORMAT(preco,2, 'de_DE')) as preco, img FROM PRODUTOS";
      this._db.query(sql, function (erro, recordset) {
        if (erro) {
          console.log(erro);
          return reject("Lista de PRODUTOS FALHOU!");
        }
        resolve(recordset);
      });
    });
  }

  listagemProdutoPorId(id) {
    return new Promise((resolve, reject) => {
      this._db.query(
        "SELECT * FROM PRODUTOS WHERE idProduto=?",
        [id],
        (erro, resultado) => {
          if (erro) {
            console.log(erro);
            return reject("Erro no select * from produtos where idProduto=X");
          }
          resolve(resultado);
        }
      );
    });
  }
}

module.exports = dao_PRODUTOS;
