const mongoose = require("mongoose");
const routerLista = require("express").Router();
require("../config/db");

require("../models/Banco");

const Banco = mongoose.model("bancos");

routerLista.get("/Bairro", (req, res) => {
    res.redirect("/principal.html");
});

routerLista.get("/Cidade", (req, res) => {
    res.redirect("/principal.html");
});

routerLista.get("/Estado", (req, res) => {
    res.redirect("/principal.html");
});

routerLista.get("/Banco", (req, res) => {
    Banco.find().sort({nome: "asc"})
        .then((bancos) => {
            const lista = [];
            bancos.forEach(bnc => {
                lista.push({
                    banco: {
                        id: bnc._id,
                        nome: bnc.nome,
                        created: `${bnc.created.toLocaleDateString("pt-BR")} ${bnc.created.toLocaleTimeString("pt-BR")}`,
                        modified: `${bnc.modified.toLocaleDateString("pt-BR")} ${bnc.modified.toLocaleTimeString("pt-BR")}`
                    }
                });
            });
            res.render("listas/banco", {bancos: lista});
        })
        .catch((err) => {
            req.flash("error_msg", "Erro ao listar Bancos " + err);
            res.redirect("/");
        });
});

routerLista.post("/Banco/add", (req, res) => {
    console.log("Nome: " + req.body.txtNomeBanco);
    new Banco(
        {
            nome: req.body.txtNomeBanco
        })
        .save()
        .then(() => {
            console.log("Banco salvo!");
            res.redirect("/Lista/Banco");
        })
        .catch((err) => {
            console.log("Erro: " + err); 
        });
});

module.exports = { routerLista };