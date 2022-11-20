const express = require("express");
const app = express();

app.set("view engine", "ejs");

app.use(express.static("public")); //permite utilizar o css e imagens

require("../app/rotas/rotas")(app);

module.exports = app;
