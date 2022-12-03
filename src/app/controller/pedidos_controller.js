const dao_PEDIDOS = require("../BD/dao_PEDIDOS");
const dao_PRODUTOS = require("../BD/dao_PRODUTOS");

// instancia da CONEXÃO com o BD
var db = require("../../config/database");

class PedidosController {
  exibeDadosDosPedidos(sessao) {
    return function (req, res) {
      sessao = req.session;
      if (sessao.login) {
        const pedidoDAO = new dao_PEDIDOS(db);
        pedidoDAO
          .dadosDosPedidos()
          .then((resultados) => {
            res.render("consulta_pedidos", { pedidos: resultados });
          })
          .catch((erro) => console.log(erro));
      } else {
        res.redirect("acesso");
      }
    };
  }

  criaPedidos(sessao) {
    return function (req, res) {
      sessao = req.session;
      if (sessao.login) {
        const produtoDAO = new dao_PRODUTOS(db);
        const cpedidoDAO = new dao_PEDIDOS(db);

        produtoDAO
          .listagemProdutoPorId(req.body.idProduto)
          .then(([produto]) => {
            cpedidoDAO
              .incluiPedidos({
                dataPedido: new Date().toISOString().split("T")[0],
                idProduto: req.body.idProduto,
                quantidade: req.body.qde,
                valorUnitario: produto.preco,
                idStatus: 1,
                valorTotal: req.body.qde * produto.preco,
              })
              .then((resultados) => {
                res.status(200).send();
              })
              .catch((erro) => console.log(erro));
          });
      } else {
        res.redirect("acesso");
      }
    };
  }

  deletarPedidos(sessao) {
    return function (req, res) {
      sessao = req.session;
      if (sessao.login){
        const idDoPedido = req.params.id;
        const pedidoDAO = new dao_PEDIDOS(db);
        pedidoDAO
          .excluirPedidos(idDoPedido)
          .then((mensagem) => {
            console.log(mensagem);
            res.redirect("../../pedidos");
          })
          .catch((mensagem) => {
            console.log(mensagem);
            res.send(mensagem);
          });
      }
      else {
        res.redirect("acesso");
      }

    };
  }
} // end da classe

module.exports = PedidosController;
