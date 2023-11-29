const routerMain = require("express").Router();

routerMain.get("/", (req, res) => {
    res.render("home"); 
});

module.exports = { routerMain };