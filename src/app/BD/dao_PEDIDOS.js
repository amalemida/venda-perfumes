class dao_PEDIDOS {
  constructor(db) {
    this._db = db;
  }

  dadosDosPedidos() {
    return new Promise((resolve, reject) => {
      var sql =`
        SELECT 
          idPedido,
          DATE_FORMAT(dataPedido,"%d/%m/%Y") as dataPedido,
          p2.descricao as produtoDescricao,
          p.quantidade,
          Concat('R$ ',FORMAT(valorUnitario,2, 'de_DE')) as valorUnitario,
          Concat('R$ ',FORMAT(valorTotal,2, 'de_DE')) as valorTotal,
          s.descricao as statusDescricao
        FROM
          pedidos p
        inner join
          status s on p.idStatus = s.idStatus
        inner join 
          produtos p2 on p2.idProduto = p.idProduto 
      `;

      this._db.query(sql, function (erro, recordset) {
        if (erro) {
          console.log(erro);
          return reject("Lista de PEDIDOS FALHOU!");
        }
        resolve(recordset);
      });
    });
  }

  incluiPedidos(dados) {
    return new Promise((resolve, reject) => {
      var sqlInclui = `
          INSERT INTO PEDIDOS (
            dataPedido,
            idProduto,
            quantidade,
            valorUnitario,
            valorTotal,
            idStatus
          ) VALUES(
            '${dados.dataPedido}',
            ${dados.idProduto},
            ${dados.quantidade},
            ${dados.valorUnitario},
            ${dados.valorTotal},
            ${dados.idStatus}
          )`;
      this._db.query(sqlInclui, function (erro) {
        if (erro) {
          console.log(erro);
          return reject("Inclusão do pedido NÃO foi executada com sucesso");
        }
        resolve("Inclusão do pedido foi executada com sucesso");
      });
    });
  }

  excluirPedidos(id) 
    {
        return new Promise((resolve,reject) => 
        {
            var sqlDelete = "DELETE FROM PEDIDOS WHERE idPedido=" + id;
            this._db.query(sqlDelete,function(erro) {
                if (erro) {
                   console.log(erro);
                   return reject('Exclusão do pedido NÃO foi executada com sucesso');
                }
                resolve('Exclusão do pedido executada com sucesso');
            });
        });
    }
}

module.exports = dao_PEDIDOS;
