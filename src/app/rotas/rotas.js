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

  app.get('/clientes/consultaPorId/:id', clienteControlador.consultarPorIdClientes());
  
  app.get('/clientes/deleta/:id', clienteControlador.deletarClientes());

  app.get('/clientes/incluiClientes', (req,res) => {
    res.render('inclusao_clientes');
  });
  
  app.get("/produtos", produtoControlador.exibeDadosDosProdutos());
  
  app.get("/produtos/consultaPorId/:id", produtoControlador.consultarPorIdProdutos());
  
  app.get("/pedidos", pedidosControlador.exibeDadosDosPedidos());

  app.get('/pedidos/deleta/:id', pedidosControlador.deletarPedidos());

  app.post("/pedidos", pedidosControlador.criaPedidos());

  app.post("/acesso", (req, res) => {
    usuarioControlador.exibeResultadoValidacaoAcesso(sessao)(req, res);
  });

  app.get('/clientes/deleta/:id', clienteControlador.deletarClientes());

  app.post('/clientes/atualiza', clienteControlador.atualizarClientes());

  app.post('/clientes/incluiClientes', clienteControlador.incluirClientes());

};
