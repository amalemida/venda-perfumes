const express = require("express");
const app = express();

app.set("view engine", "ejs");

//app.set('views');

app.use(express.static("public"));
require("./app/rotas/rotas")(app);

app.listen(3000, function () {
  console.log(
    "Servidor iniciado. Abra o navegador clicando (ctrl + clique) no link --> http://localhost:3000"
  );
});
