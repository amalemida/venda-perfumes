const express = require("express");
const app = express();
const { dirname } = require("path");
const http = require("http").Server(app);
const porta = 3000;

http.listen(porta, function () {
  console.log("Servidor iniciado. Abra o navegador em http://localhost:3000");
});

app.use(express.static("public"));

app.get("/", function (req, resp) {
  resp.sendFile(__dirname + "/public/menu.html");
});
