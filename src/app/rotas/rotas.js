module.exports = (app) => 
{
  app.get("/acesso", (req, res) => {
    res.render("../src/app/views/acesso");
  });

  app.get("/menu", (req, res) => {
    res.render("../src/app/views/menu");
  });

  app.get("/quem_sou", (req, res) => {
    res.render("../src/app/views/quem_sou");
  });

  app.get("/vitrine_de_produtos", (req, res) => {
    res.render("../src/app/views/vitrine_de_produtos");
  });
};
