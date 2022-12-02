const dao_PEDIDOS = require("../BD/dao_PEDIDOS");

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
            console.log(resultados);
            res.render("consulta_pedidos", { pedidos: resultados });
          })
          .catch((erro) => console.log(erro));
      } else {
        res.redirect("acesso");
      }
    };
  }
} // end da classe

module.exports = PedidosController;
