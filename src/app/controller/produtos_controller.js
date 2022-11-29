const dao_PRODUTOS = require("../BD/dao_PRODUTOS");

// instancia da CONEXÃO com o BD
var db = require("../../config/database");

class ProdutosController {  
  exibeDadosDosProdutosEJS() {
    return function (req, res) {
      const produtoDAO = new dao_PRODUTOS(db);
      produtoDAO
        .dadosDosProdutosEJS()
        .then((resultados) => {
          console.log(resultados);
          res.render("listaProdutos", { produtos: resultados });
        })
        .catch((erro) => console.log(erro));
    };
  }

  consultarPorIdProdutos() {
    return function (req, res) {
      const idDoProduto = req.params.id;
      const produtoDAO = new dao_PRODUTOS(db);
      produtoDAO
        .listagemProdutoPorId(idDoProduto)
        .then((dados) => {
          res.render("../views/listaProdutos", {
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
