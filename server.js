const app = require("./src/config/meu-express");
var porta = 3000;

app.listen(3000, function () {
  console.log(
    "Servidor iniciado. Abra o navegador clicando (ctrl + clique) no link --> http://localhost:" +
      porta +
      "/acesso"
  );
});
