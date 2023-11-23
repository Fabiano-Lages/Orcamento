const routerMain = require("express").Router();

routerMain.get("/", (req, res) => {
    res.render("home"); 
});

routerMain.get("/Cliente", (req, res) => {
    res.redirect("/principal.html");
});

routerMain.get("/Orcamento", (req, res) => {
    res.redirect("/principal.html");
});

module.exports = { routerMain };