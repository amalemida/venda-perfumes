var sessao;
const UsuariosController = require("../controller/usuarios_controller");
const usuarioControlador = new UsuariosController();
const ClientesController = require("../controller/clientes_controller");
const clienteControlador = new ClientesController();
const ProdutosController = require("../controller/produtos_controller");
const produtoControlador = new ProdutosController();
const PedidosController = require("../controller/pedidos_controller");
const pedidosControlador = new PedidosController();

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
  
  app.get("/clientes", clienteControlador.exibeDadosCliente());
  
  app.get("/produtos", produtoControlador.exibeDadosDosProdutos());
  
  app.get("/produtos/:id", produtoControlador.consultarPorIdProdutos());
  
  app.get("/pedidos", pedidosControlador.exibeDadosDosPedidos());

  app.post("/acesso", (req, res) => {
    console.log(req.body);
    usuarioControlador.exibeResultadoValidacaoAcesso(sessao)(req, res);
  });
};
