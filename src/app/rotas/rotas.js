var sessao;
const UsuariosController = require("../controller/usuarios_controller");
const usuarioControlador = new UsuariosController();
const ClientesController = require("../controller/clientes_controller");
const clienteControlador = new ClientesController();
const ProdutosController = require("../controller/produtos_controller");
const produtoControlador = new ProdutosController();

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

  app.get("/clientes", clienteControlador.exibeDadosClienteEJS());

  app.get("/produtos", produtoControlador.exibeDadosDosProdutosEJS());
  app.get("/produtos/:id", produtoControlador.consultarPorIdProdutos());
};
