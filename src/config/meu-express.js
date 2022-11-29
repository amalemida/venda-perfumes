const express = require("express");
const app = express();
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");
const expressLayouts = require('express-ejs-layouts');

app.use(
  session({
    secret: "amarcelo",
    saveUninitialized: true,
    resave: true,
  })
);
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "../views"));

app.use(expressLayouts);

app.use(express.static("public")); //permite utilizar o css e imagens

require("../app/rotas/rotas")(app);

module.exports = app;
