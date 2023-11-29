//const mongoose = require("mongoose");
const routerOrca = require("express").Router();

routerOrca.get("/", (req, res) => {
    res.render("orcamento/");
});

module.exports = { routerOrca };