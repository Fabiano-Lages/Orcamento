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
                    bairro: (cli.bairro ? { id: cli.bairro._id, nome: cli.bairro.nome } : {id:"", nome: ""} ),
                    cidade: (cli.cidade ? { id: cli.cidade._id, nome: cli.cidade.nome } : {id:"", nome: ""} ),
                    estado: (cli.estado ? { id: cli.estado._id, nome: cli.estado.nome } : {id:"", nome: ""} ),
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
                if(req.body.txtEndereco) {
                    cliente.endereco = req.body.txtEndereco;
                } else {
                    delete cliente.endereco;
                }
        
                if(req.body.txtNumero) {
                    cliente.numero = Number(req.body.txtNumero);
                } else {
                    delete cliente.numero;
                }
        
                if(req.body.txtComplemento) {
                    cliente.complemento = req.body.txtComplemento;
                } else {
                    delete cliente.complemento;
                }
        
                if(req.body.txtCEP) {
                    cliente.cep = req.body.txtCEP;
                } else {
                    delete cliente.cep;
                }
        
                if(req.body.dropBairro) {
                    cliente.bairro = new mongoose.Types.ObjectId(req.body.dropBairro);
                } else {
                    delete cliente.bairro;
                }
        
                if(req.body.dropCidade) {
                    cliente.cidade = new mongoose.Types.ObjectId(req.body.dropCidade);
                } else {
                    delete cliente.cidade;
                }
        
                if(req.body.dropEstado) {
                    cliente.estado = new mongoose.Types.ObjectId(req.body.dropEstado);
                } else {
                    delete cliente.estado;
                }

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
        const obj = {
            nome: req.body.txtNomeCliente,
        };

        if(req.body.txtEndereco) {
            obj.endereco = req.body.txtEndereco;
        }

        if(req.body.txtNumero) {
            obj.numero = Number(req.body.txtNumero);
        }

        if(req.body.txtComplemento) {
            obj.complemento = req.body.txtComplemento;
        }

        if(req.body.txtCEP) {
            obj.cep = req.body.txtCEP;
        }

        if(req.body.dropBairro) {
            obj.bairro = new mongoose.Types.ObjectId(req.body.dropBairro);
        }

        if(req.body.dropCidade) {
            obj.cidade = new mongoose.Types.ObjectId(req.body.dropCidade);
        }

        if(req.body.dropEstado) {
            obj.estado = new mongoose.Types.ObjectId(req.body.dropEstado);
        }

        new Cliente(obj)
            .save()
            .then(() => {
                req.flash("Log", `${nomeObjeto} ${obj.nome} incluído com sucesso`);
                res.redirect(destino);
            })
            .catch((err) => {
                req.flash("Erro", `Erro ao incluir o ${nomeObjeto.toLowerCase()} ${obj.nome}. ${err}`);
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