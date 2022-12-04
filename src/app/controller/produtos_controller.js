const dao_PRODUTOS = require("../BD/dao_PRODUTOS");

var db = require("../../config/database");

class ProdutosController {
  exibeDadosDosProdutos(sessao) {
    return function (req, res) {
      sessao = req.session;
      if (sessao.login) {
        const produtoDAO = new dao_PRODUTOS(db);
        produtoDAO
          .dadosDosProdutos()
          .then((resultados) => {
            res.render("lista_produtos", { produtos: resultados });
          })
          .catch((erro) => console.log(erro));
      } else {
        res.redirect("acesso");
      }
    };
  }

  consultarPorIdProdutos() {
    return function (req, res) {
      const idDoProduto = req.params.id;
      const produtoDAO = new dao_PRODUTOS(db);
      produtoDAO
        .listagemProdutoPorId(idDoProduto)
        .then((dados) => {
          res.render("../views/lista_produtos", {
            produtos: dados[0],
          });
        })
        .catch((mensagem) => {
          console.log(mensagem);
          res.send(mensagem);
        });
    };
  }
} // end da classe

module.exports = ProdutosController;
