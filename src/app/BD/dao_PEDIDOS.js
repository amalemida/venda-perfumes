class dao_PEDIDOS {
  constructor(db) {
    this._db = db;
  }

  dadosDosPedidos() {
    return new Promise((resolve, reject) => {
      var sql =
        "SELECT idPedido, dataPedido, idProduto, quantidade, Concat('R$ ',FORMAT(valorUnitario,2, 'de_DE')) as valorUnitario, Concat('R$ ',FORMAT(valorTotal,2, 'de_DE')) as valorTotal, idStatus FROM PEDIDOS";
      this._db.query(sql, function (erro, recordset) {
        if (erro) {
          console.log(erro);
          return reject("Lista de PEDIDOS FALHOU!");
        }
        resolve(recordset);
      });
    });
  }
}

module.exports = dao_PEDIDOS;
