const app = require("./src/config/meu-express");

app.listen(3000, function () {
  console.log(
    "Servidor iniciado. Abra o navegador clicando (ctrl + clique) no link --> http://localhost:3000/menu"
  );
});
