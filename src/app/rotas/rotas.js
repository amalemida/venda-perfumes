var sessao;
const UsuariosController = require("../controller/usuarios_controller");
const usuarioControlador = new UsuariosController();

module.exports = (app) => {
  app.get("/acesso", (req, res) => {
    usuarioControlador.exibeFormAcesso(sessao)(req, res);
  });

  app.get("/menu", (req, res) => {
    res.render("menu");
  });

  app.get("/quem_sou", (req, res) => {
    res.render("quem_sou");
  });

  app.get("/vitrine_de_produtos", (req, res) => {
    res.render("vitrine_de_produtos");
  });

  app.post("/acesso", (req, res) => {
    console.log(req.body);
    usuarioControlador.exibeResultadoValidacaoAcesso(sessao)(req, res);
  });
};
