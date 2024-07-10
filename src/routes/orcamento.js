const mongoose = require("mongoose");
const routerOrca = require("express").Router();
require("../models/Orcamento");

const Orcamento = mongoose.model("orcamentos");

routerOrca.get("/", async (req, res) => {
    const orcamentos = [];
    const rst = await Orcamento.find().populate("cliente").sort({cliente: "asc"});
    if(rst) {
        rst.forEach(orc => {
            orcamentos.push({
                bairro: {
                    id: orc._id,
                    cliente: orc.cliente,
                    descricao: orc.descricao,
                    complemento: orc.complemento,
                    valor: orc.valor,
                    created: `${orc.created.toLocaleDateString("pt-BR")} ${orc.created.toLocaleTimeString("pt-BR")}`,
                    modified: `${orc.modified.toLocaleDateString("pt-BR")} ${orc.modified.toLocaleTimeString("pt-BR")}`
                }
            });
        });

        res.render("orcamento/", {orcamentos});
    }
});


routerOrca.post("/add", (req, res) => {
    const destino = "/Orcamento";
    const nomeObjeto = "Orçamento";

    if(req.body.idOrcamento) {
        Orcamento.findOne({_id: req.body.idOrcamento})
            .then((orcamento) => {
                orcamento.cliente = new mongoose.Types.ObjectId(req.body.dropCliente);
                orcamento.descricao = req.body.txtDescricao;
                orcamento.valor = Number(req.body.txtValor);
                orcamento.modified = new Date();

                orcamento.save()
                    .then(() => {
                        req.flash("Log", `${nomeObjeto} ${req.body.dropCliente} de ${req.body.txtValor} editado com sucesso`);
                        res.redirect(destino);
                    })
                    .catch((err) => {
                        req.flash("Erro", `Erro ao editar o ${nomeObjeto.toLowerCase()} ${req.body.dropCliente} de ${req.body.txtValor}. ${err}`);
                        res.redirect(destino);
                    });
            })
            .catch((err) => {
                req.flash("Erro", `Erro ao editar o ${nomeObjeto.toLowerCase()} ${req.body.dropCliente} de ${req.body.txtValor}. ${err}`);
                res.redirect(destino);
            });
    } else {
        new Orcamento(
            {
                cliente: new mongoose.Types.ObjectId(req.body.dropCliente),
                descricao: req.body.txtDescricao,
                valor: Number(req.body.txtValor)
            })
            .save()
            .then(() => {
                req.flash("Log", `${nomeObjeto} ${req.body.dropCliente} de ${req.body.txtValor} incluído com sucesso`);
                res.redirect(destino);
            })
            .catch((err) => {
                req.flash("Erro", `Erro ao incluir o ${nomeObjeto.toLowerCase()} ${req.body.dropCliente} de ${req.body.txtValor}. ${err}`);
                res.redirect(destino);
            });
    }
});

routerOrca.post("/del", async (req, res) => { 
    const destino = "/Orcamento";
    Orcamento.deleteOne({_id: req.body.idOrcamento})
        .then(() => {
            req.flash("Log", `Orçamento ${req.body.dropCliente} de R$ ${req.body.txtValor} removido`);
            res.redirect(destino);
        })
        .catch((err) => {
            req.flash("Erro", `Erro ao apagar o orçamento ${req.body.dropCliente} de R$ ${req.body.txtValor}. ${err}`);
            res.redirect(destino);
        });
});

module.exports = { routerOrca };