//const mongoose = require("mongoose");
const mongoose = require("mongoose");
const routerCliente = require("express").Router();
require("../models/Cliente");

const Cliente = mongoose.model("clientes");

routerCliente.get("/", async (req, res) => {
    const clientes = [];
    const rst = await Cliente.find().populate("bairro").populate("cidade").populate("estado").sort({nome: "asc"});
    if(rst) {
        rst.forEach(cli => {
            clientes.push({
                cliente: {
                    id: cli._id,
                    nome: cli.nome,
                    endereco: cli.endereco,
                    numero: cli.numero,
                    complemento: cli.complemento,
                    bairro: {
                        id: cli.bairro._id,
                        nome: cli.bairro.nome
                    },
                    cidade: {
                        id: cli.cidade._id,
                        nome: cli.cidade.nome
                    },
                    estado: {
                        id: cli.estado._id,
                        nome: cli.estado.nome
                    },
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
        Cliente.findOne({_id: req.body.idCliente})
            .then((cliente) => {
                cliente.nome = req.body.txtNomeCliente;
                cliente.endereco = req.body.txtEndereco;
                cliente.numero = req.body.txtNumero;
                cliente.complemento = req.body.txtComplemento;
                cliente.bairro = req.body.dropBairro;
                cliente.cidade = req.body.dropCidade;
                cliente.estado = req.body.dropEstado;
                cliente.cep = req.body.txtCEP;
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
                nome: req.body.txtNomeCliente,
                endereco: req.body.txtEndereco,
                numero: req.body.txtNumero,
                complemento: req.body.txtComplemento,
                bairro: req.body.dropBairro,
                cidade: req.body.dropCidade,
                estado: req.body.dropEstado,
                cep: req.body.txtCEP
            })
            .save()
            .then(() => {
                req.flash("Log", `${nomeObjeto} ${req.body.txtNomeCliente} incluído com sucesso`);
                res.redirect(destino);
            })
            .catch((err) => {
                req.flash("Erro", `Erro ao incluir o ${nomeObjeto.toLowerCase()} ${req.body.txtNomeCliente}. ${err}`);
                res.redirect(destino);
                console.log(err);
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