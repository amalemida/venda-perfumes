module.exports = (app) => {


  app.get("/menu", (req, res) => {
    res.render("../app/views/menu");
  });

  app.get("/quem_sou", (req, res) => {
    res.render("../app/views/quem_sou");
  });

  app.get("/vitrine_de_produtos", (req, res) => {
    res.render("../app/views/vitrine_de_produtos");
  });
};
