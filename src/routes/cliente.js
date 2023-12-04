//const mongoose = require("mongoose");
const mongoose = require("mongoose");
const routerCliente = require("express").Router();
require("../models/Cliente");

const Cliente = mongoose.model("clientes");

routerCliente.get("/", async (req, res) => {
    const clientes = [];
    const rst = await Cliente.find().populate("bairro", "cidade", "estado").sort({nome: "asc"});
    if(rst) {
        rst.forEach(cli => {
            clientes.push({
                bairro: {
                    id: cli._id,
                    nome: cli.nome,
                    numero: cli.numero,
                    complemento: cli.complemento,
                    bairro: cli.bairro,
                    cidade: cli.cidade,
                    estado: cli.estado,
                    cep: cli.cep,
                    created: `${cli.created.toLocaleDateString("pt-BR")} ${cli.created.toLocaleTimeString("pt-BR")}`,
                    modified: `${cli.modified.toLocaleDateString("pt-BR")} ${cli.modified.toLocaleTimeString("pt-BR")}`
                }
            });
        });

        res.render("cliente/", {clientes});
    }
});


routerCliente.post("/add", (req, res) => {
    const destino = "/Cliente";
    const nomeObjeto = "Cliente";

    if(req.body.idCliente) {
        Cliente.findOne({_id: req.body.idBairro})
            .then((cliente) => {
                cliente.nome = req.body.txtNomeCliente;
                cliente.modified = new Date();

                cliente.save()
                    .then(() => {
                        req.flash("Log", `${nomeObjeto} ${req.body.txtNomeCliente} editado com sucesso`);
                        res.redirect(destino);
                    })
                    .catch((err) => {
                        req.flash("Erro", `Erro ao editar o ${nomeObjeto.toLowerCase()} ${req.body.txtNomeCliente}. ${err}`);
                        res.redirect(destino);
                    });
            })
            .catch((err) => {
                req.flash("Erro", `Erro ao editar o ${nomeObjeto.toLowerCase()} ${req.body.txtNomeCliente}. ${err}`);
                res.redirect(destino);
            });
    } else {
        new Cliente(
            {
                nome: req.body.txtNomeClioente,
                cidade: new mongoose.Types.ObjectId(req.body.hdCidade)
            })
            .save()
            .then(() => {
                req.flash("Log", `${nomeObjeto} ${req.body.txtNomeCliente} incluído com sucesso`);
                res.redirect(destino);
            })
            .catch((err) => {
                req.flash("Erro", `Erro ao incluir o ${nomeObjeto.toLowerCase()} ${req.body.txtNomeCliente}. ${err}`);
                res.redirect(destino);
            });
    }
});

routerCliente.post("/del", async (req, res) => { 
    const destino = "/Cliente";
    Cliente.deleteOne({_id: req.body.idCliente})
        .then(() => {
            req.flash("Log", `Cliente ${req.body.txtNomeCliente} removido`);
            res.redirect(destino);
        })
        .catch((err) => {
            req.flash("Erro", `Erro ao apagar o cliente ${req.body.txtNomeCliente}. ${err}`);
            res.redirect(destino);
        });
});

module.exports = { routerCliente };