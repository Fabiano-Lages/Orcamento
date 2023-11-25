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
    if(req.body.idBanco) {
        Banco.findOne({_id: req.body.idBanco})
            .then((banco) => {
                banco.nome = req.body.txtNomeBanco;
                banco.modified = new Date();

                banco.save()
                    .then(() => {
                        req.flash("Log", `Banco ${req.body.txtNomeBanco} editado com sucesso`);
                        res.redirect("/Lista/Banco");
                    })
                    .catch((err) => {
                        req.flash("Erro", `Erro ao editar o banco ${req.body.txtNomeBanco}. ${err}`);
                        res.redirect("/Lista/Banco");
                    });
            })
            .catch((err) => {
                req.flash("Erro", `Erro ao editar o banco ${req.body.txtNomeBanco}. ${err}`);
                res.redirect("/Lista/Banco");
            });
    } else {
        new Banco(
            {
                nome: req.body.txtNomeBanco
            })
            .save()
            .then(() => {
                req.flash("Log", `Banco ${req.body.txtNomeBanco} incluído com sucesso`);
                res.redirect("/Lista/Banco");
            })
            .catch((err) => {
                req.flash("Erro", `Erro ao incluir o banco ${req.body.txtNomeBanco}. ${err}`);
                res.redirect("/Lista/Banco");
            });
    }
});

routerLista.post("/Banco/del", (req, res) => { 
    Banco.deleteOne({_id: req.body.idBanco})
        .then(() => {
            req.flash("Log", `Banco ${req.body.txtNomeBanco} removido`);
            res.redirect("/Lista/Banco");
        })
        .catch((err) => {
            req.flash("Erro", `Erro ao apagar o banco ${req.body.txtNomeBanco}. ${err}`);
            res.redirect("/Lista/Banco");
        });
});

module.exports = { routerLista };