const dao_USUARIOS = require('../BD/dao_USUARIOS');

// instancia da CONEXÃO com o BD
var db = require('../../config/database');
const { redirect } = require('express/lib/response');
const res = require('express/lib/response');

class UsuariosController 
{

  exibeFormAcesso(sessao)
  {
    return function(req,res) {
      sessao = req.session;
      sessao.login = req.body.login;
      if(sessao.login == null) {
        res.render(
          'acesso'
        )
      }
    }
  }

   exibeResultadoValidacaoAcesso(sessao) 
   {
    return function(req,res) {
      var login_form = req.body.login;
      var senha_form = req.body.senha;
    
      const usuarioDAO = new dao_USUARIOS(db);
      usuarioDAO.validaAcesso(login_form, senha_form)
        .then((dados) => {  
          console.log(dados);
          if(dados.length > 0)
          {
            sessao = req.session;
            sessao.login = login_form;
            sessao.senha = senha_form;
            res.redirect('/menu');
          }
          else
            res.send('Por favor, faça o ACESSO!');
        })
        .catch((mensagem) => {  
          console.log(mensagem);
          res.send(mensagem);
        }); 
    }
   }
   
}  // end da classe
  
module.exports = UsuariosController;

