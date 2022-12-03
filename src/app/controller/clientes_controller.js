const dao_CLIENTES = require("../BD/dao_CLIENTES");
var db = require("../../config/database");

class ClientesController {
  exibeFormInclusaoCliente(sessao) {
    return function (req, res) {
      sessao = req.session;
      if (sessao.login) {
        res.render("lista_clientes");
      } 
      else {
        res.redirect("acesso");
      }
    };
  }

  incluirClientes(sessao) 
  {
    return function(req,res) {
      sessao = req.session;
      if (sessao.login) {
        const dadosDoForm = req.body;
        const clienteDAO = new dao_CLIENTES(db);
        clienteDAO.incluiClientes(dadosDoForm)
          .then((mensagem) => {  
            console.log(mensagem);
            res.redirect('/clientes');
          })
          .catch((mensagem) => {  
            console.log(mensagem);
            res.send(mensagem);
          });
      }
      else {
        res.redirect("../acesso");
      }

    }
  }

  deletarClientes() {
    return function (req, res) {
      sessao = req.session;
      if (sessao.login){
        const idDoCliente = req.params.id;
        const clienteDAO = new dao_CLIENTES(db);
        clienteDAO
          .excluirClientes(idDoCliente)
          .then((mensagem) => {
            console.log(mensagem);
            res.redirect("../../clientes");
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

  exibeDadosCliente(sessao) {
    return function (req, res) {
      sessao = req.session;
      if (sessao.login){
      const clienteDAO = new dao_CLIENTES(db);
      clienteDAO
        .dadosDosClientes()
        .then((resultados) => {
          console.log(resultados);
          res.render("lista_clientes", { clientes: resultados });
        })
        .catch((erro) => console.log(erro));
      } else {
        res.redirect("acesso");
      }
    };
  }

  consultarPorIdClientes() {
    return function (req, res) {
      sessao = req.session;
      if (sessao.login){
        const idDoCliente = req.params.id;
        const clienteDAO = new dao_CLIENTES(db);
        clienteDAO
          .listagemClientePorId(idDoCliente)
          .then((resultados) => {
            res.render(("atualizacao_clientes"), {
              clientes: resultados[0],
            });
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

  atualizarClientes() {
    return function (req, res) {
      sessao = req.session;
      if (sessao.login){
        const dadosDoForm = req.body;
        const clienteDAO = new dao_CLIENTES(db);
        clienteDAO
          .atualizaCliente(dadosDoForm)
          .then((mensagem) => {
            console.log(mensagem);
            res.redirect("../../clientes");
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
}

module.exports = ClientesController;
