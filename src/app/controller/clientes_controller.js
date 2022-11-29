const dao_CLIENTES = require("../BD/dao_CLIENTES");

// instancia da CONEXÃO com o BD
var db = require("../../config/database");

class ClientesController {
  exibeFormInclusaoCliente(sessao) {
    return function (req, res) {
      sessao = req.session;
      if (sessao.login) {
        res.marko(require("../views/clientes/inclusaoClientes.marko"));
      } else res.write("<h1>Primeiramente, faca seu LOGIN!</h1>");
    };
  }

  // método chamará a listagemClientes enviando os dados para a interface de clientes
  listarClientes(sessao) {
    return function (req, res) {
      sessao = req.session;
      if (sessao.login) {
        const clienteDAO = new dao_CLIENTES(db);
        clienteDAO
          .listagemClientes()
          .then((dados) => {
            res.marko(require("../views/clientes/listagemClientes.marko"), {
              clientes: dados,
              sessao: sessao,
            });
          })
          .catch((mensagem) => {
            console.log(mensagem);
            res.send(mensagem);
          });
      } else {
        res.write("<h1>Primeiramente, faca seu LOGIN!</h1>");
      }
    };
  }

  deletarClientes() {
    return function (req, res) {
      const idDoCliente = req.params.id;
      const clienteDAO = new dao_CLIENTES(db);
      clienteDAO
        .excluirClientes(idDoCliente)
        .then((mensagem) => {
          console.log(mensagem);
          res.redirect("/clientes");
        })
        .catch((mensagem) => {
          console.log(mensagem);
          res.send(mensagem);
        });
    };
  }

  exibeDadosClienteEJS() {
    return function (req, res) {
      const clienteDAO = new dao_CLIENTES(db);
      clienteDAO
        .dadosDosClientesEJS()
        .then((resultados) => {
          console.log(resultados);
          res.render("listaClientes", { clientes: resultados });
        })
        .catch((erro) => console.log(erro));
    };
  }

  consultarPorIdClientes() {
    return function (req, res) {
      const idDoCliente = req.params.id;
      const clienteDAO = new dao_CLIENTES(db);
      clienteDAO
        .listagemClientePorId(idDoCliente)
        .then((dados) => {
          res.marko(require("../views/clientes/atualizacaoClientes.marko"), {
            clientes: dados[0],
          });
        })
        .catch((mensagem) => {
          console.log(mensagem);
          res.send(mensagem);
        });
    };
  }

  incluirClientes() {
    return function (req, res) {
      const dadosDoForm = req.body;
      const clienteDAO = new dao_CLIENTES(db);
      clienteDAO
        .incluiClientes(dadosDoForm)
        .then((mensagem) => {
          console.log(mensagem);
          res.redirect("/clientes");
        })
        .catch((mensagem) => {
          console.log(mensagem);
          res.send(mensagem);
        });
    };
  }

  atualizarClientes() {
    return function (req, res) {
      const dadosDoForm = req.body;
      const clienteDAO = new dao_CLIENTES(db);
      clienteDAO
        .atualizaCliente(dadosDoForm)
        .then((mensagem) => {
          console.log(mensagem);
          res.redirect("/clientes");
        })
        .catch((mensagem) => {
          console.log(mensagem);
          res.send(mensagem);
        });
    };
  }
} // end da classe

module.exports = ClientesController;
