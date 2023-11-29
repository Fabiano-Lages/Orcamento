//const mongoose = require("mongoose");
const routerCliente = require("express").Router();


routerCliente.get("/", (req, res) => {
    res.render("cliente/");
});

module.exports = { routerCliente };