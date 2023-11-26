const mongoose = require("mongoose");
const routerLista = require("express").Router();
require("../config/db");

require("../models/Banco");
require("../models/Estado");
require("../models/Cidade");
require("../models/Bairro");

const Banco = mongoose.model("bancos");
const Estado = mongoose.model("estados");
const Cidade = mongoose.model("cidades");
const Bairro = mongoose.model("bairros");

routerLista.get("/Bairro", (req, res) => {
    buscaBairro(req, res);
});

routerLista.get("/Bairro/:cidade", (req, res) => {
    buscaBairro(req, res, req.params.cidade);
});

const buscaBairro = async (req, res, cidade) => {
    let filtro = {cidade};
    let selecionado = cidade;

    const listaEstado = [];
    const listaCidade = [];
    (await Estado.find().sort({nome: "asc"}))
        .forEach(est => listaEstado.push({id: est._id, nome: est.nome}));

    if(!cidade && listaCidade.length) {
        filtro = {estado: listaCidade[0].id};
        selecionado = listaCidade[0].id;
    }

    Bairro.find(filtro).sort({nome: "asc"})
        .then((bairros) => {
            const lista = [];
            bairros.forEach(brr => {
                lista.push({
                    bairro: {
                        id: brr._id,
                        nome: brr.nome,
                        cidade: brr.cidade,
                        created: `${brr.created.toLocaleDateString("pt-BR")} ${brr.created.toLocaleTimeString("pt-BR")}`,
                        modified: `${brr.modified.toLocaleDateString("pt-BR")} ${brr.modified.toLocaleTimeString("pt-BR")}`
                    }
                });
            });
            res.render("listas/bairro", {bairros: lista, cidades: listaCidade, selecionado});
        })
        .catch((err) => {
            req.flash("error_msg", "Erro ao listar bairros " + err);
            res.redirect("/");
        });
};

routerLista.post("/Bairro/add", (req, res) => {
    const destino = `/Lista/Bairro/${req.body.hdCidade}`;
    const nomeObjeto = "Bairro";

    if(req.body.idBairro) {
        Bairro.findOne({_id: req.body.idBairro})
            .then((bairro) => {
                bairro.nome = req.body.txtNomeBairro;
                bairro.modified = new Date();

                bairro.save()
                    .then(() => {
                        req.flash("Log", `${nomeObjeto} ${req.body.txtNomeBairro} editado com sucesso`);
                        res.redirect(destino);
                    })
                    .catch((err) => {
                        req.flash("Erro", `Erro ao editar o ${nomeObjeto.toLowerCase()} ${req.body.txtNomeBairro}. ${err}`);
                        res.redirect(destino);
                    });
            })
            .catch((err) => {
                req.flash("Erro", `Erro ao editar o ${nomeObjeto.toLowerCase()} ${req.body.txtNomeBairro}. ${err}`);
                res.redirect(destino);
            });
    } else {
        new Bairro(
            {
                nome: req.body.txtNomeBairro,
                cidade: new mongoose.Types.ObjectId(req.body.hdCidade)
            })
            .save()
            .then(() => {
                req.flash("Log", `${nomeObjeto} ${req.body.txtNomeBairro} incluído com sucesso`);
                res.redirect(destino);
            })
            .catch((err) => {
                req.flash("Erro", `Erro ao incluir o ${nomeObjeto.toLowerCase()} ${req.body.txtNomeBairro}. ${err}`);
                res.redirect(destino);
            });
    }
});

routerLista.post("/Bairro/del", async (req, res) => { 
    const destino = `/Lista/Bairro/${req.body.hdCidade}`;
    Bairro.deleteOne({_id: req.body.idBairro})
        .then(() => {
            req.flash("Log", `Bairro ${req.body.txtNomeBairro} removido`);
            res.redirect(destino);
        })
        .catch((err) => {
            req.flash("Erro", `Erro ao apagar o bairro ${req.body.txtNomeBairro}. ${err}`);
            res.redirect(destino);
        });
});

routerLista.get("/Cidade", (req, res) => {
    buscaCidade(req, res);
});

routerLista.get("/Cidade/:estado", (req, res) => {
    buscaCidade(req, res, req.params.estado);
});

const buscaCidade = async (req, res, estado) => {
    let filtro = {estado};
    let selecionado = estado;

    const listaEstado = [];
    (await Estado.find().sort({nome: "asc"}))
        .forEach(est => listaEstado.push({id: est._id, nome: est.nome}));

    if(!estado && listaEstado.length) {
        filtro = {estado: listaEstado[0].id};
        selecionado = listaEstado[0].id;
    }

    Cidade.find(filtro).sort({nome: "asc"})
        .then((cidades) => {
            const lista = [];
            cidades.forEach(cid => {
                lista.push({
                    cidade: {
                        id: cid._id,
                        nome: cid.nome,
                        estado: cid.estado,
                        codigoArea: cid.codigoArea,
                        created: `${cid.created.toLocaleDateString("pt-BR")} ${cid.created.toLocaleTimeString("pt-BR")}`,
                        modified: `${cid.modified.toLocaleDateString("pt-BR")} ${cid.modified.toLocaleTimeString("pt-BR")}`
                    }
                });
            });
            res.render("listas/cidade", {cidades: lista, estados: listaEstado, selecionado});
        })
        .catch((err) => {
            req.flash("error_msg", "Erro ao listar cidades " + err);
            res.redirect("/");
        });
};

routerLista.post("/Cidade/add", (req, res) => {
    const destino = `/Lista/Cidade/${req.body.hdEstado}`;
    const nomeObjeto = "Cidade";

    if(req.body.idCidade) {
        Cidade.findOne({_id: req.body.idCidade})
            .then((cidade) => {
                cidade.nome = req.body.txtNomeCidade;
                cidade.codigoArea = req.body.txtCodigoArea;
                cidade.modified = new Date();

                cidade.save()
                    .then(() => {
                        req.flash("Log", `${nomeObjeto} ${req.body.txtNomeCidade} editado com sucesso`);
                        res.redirect(destino);
                    })
                    .catch((err) => {
                        req.flash("Erro", `Erro ao editar a ${nomeObjeto.toLowerCase()} ${req.body.txtNomeCidade}. ${err}`);
                        res.redirect(destino);
                    });
            })
            .catch((err) => {
                req.flash("Erro", `Erro ao editar a ${nomeObjeto.toLowerCase()} ${req.body.txtNomeCidade}. ${err}`);
                res.redirect(destino);
            });
    } else {
        new Cidade(
            {
                nome: req.body.txtNomeCidade,
                codigoArea: req.body.txtCodigoArea,
                estado: new mongoose.Types.ObjectId(req.body.hdEstado)
            })
            .save()
            .then(() => {
                req.flash("Log", `${nomeObjeto} ${req.body.txtNomeCidade} incluída com sucesso`);
                res.redirect(destino);
            })
            .catch((err) => {
                req.flash("Erro", `Erro ao incluir a ${nomeObjeto.toLowerCase()} ${req.body.txtNomeCidade}. ${err}`);
                res.redirect(destino);
            });
    }
});

routerLista.post("/Cidade/del", async (req, res) => { 
    const destino = `/Lista/Cidade/${req.body.hdEstado}`;
    let bairros = await Bairro.countDocuments({estado: req.body.idEstado});
    if(!bairros) {
        Cidade.deleteOne({_id: req.body.idCidade})
            .then(() => {
                req.flash("Log", `Cidade ${req.body.txtNomeCidade} removida`);
                res.redirect(destino);
            })
            .catch((err) => {
                req.flash("Erro", `Erro ao apagar a cidade ${req.body.txtNomeCidade}. ${err}`);
                res.redirect(destino);
            });
    } else {
        req.flash("Erro", `Não é possível apagar esta cidade pois ainda existem ${bairros} bairros apontando para ela!`);
        res.redirect(destino);
    }
});

routerLista.get("/Estado", (req, res) => {
    Estado.find().sort({nome: "asc"})
        .then((estados) => {
            const lista = [];
            estados.forEach(est => {
                lista.push({
                    estado: {
                        id: est._id,
                        nome: est.nome,
                        sigla: est.sigla,
                        created: `${est.created.toLocaleDateString("pt-BR")} ${est.created.toLocaleTimeString("pt-BR")}`,
                        modified: `${est.modified.toLocaleDateString("pt-BR")} ${est.modified.toLocaleTimeString("pt-BR")}`
                    }
                });
            });
            res.render("listas/estado", {estados: lista});
        })
        .catch((err) => {
            req.flash("error_msg", "Erro ao listar estados " + err);
            res.redirect("/");
        });
});

routerLista.post("/Estado/add", (req, res) => {
    const destino = "/Lista/Estado";
    const nomeObjeto = "Estado";
    if(req.body.idEstado) {
        Estado.findOne({_id: req.body.idEstado})
            .then((estado) => {
                estado.nome = req.body.txtNomeEstado;
                estado.sigla = req.body.txtSiglaEstado;
                estado.modified = new Date();

                estado.save()
                    .then(() => {
                        req.flash("Log", `${nomeObjeto} ${req.body.txtNomeEstado} editado com sucesso`);
                        res.redirect(destino);
                    })
                    .catch((err) => {
                        req.flash("Erro", `Erro ao editar o ${nomeObjeto.toLowerCase()} ${req.body.txtNomeEstado}. ${err}`);
                        res.redirect(destino);
                    });
            })
            .catch((err) => {
                req.flash("Erro", `Erro ao editar o ${nomeObjeto.toLowerCase()} ${req.body.txtNomeEstado}. ${err}`);
                res.redirect(destino);
            });
    } else {
        new Estado(
            {
                nome: req.body.txtNomeEstado,
                sigla: req.body.txtSiglaEstado
            })
            .save()
            .then(() => {
                req.flash("Log", `${nomeObjeto} ${req.body.txtNomeEstado} incluído com sucesso`);
                res.redirect(destino);
            })
            .catch((err) => {
                req.flash("Erro", `Erro ao incluir o ${nomeObjeto.toLowerCase()} ${req.body.txtNomeEstado}. ${err}`);
                res.redirect(destino);
            });
    }
});

routerLista.post("/Estado/del", async (req, res) => { 
    let cidades = await Cidade.countDocuments({estado: req.body.idEstado});
    if(!cidades) {
        Estado.deleteOne({_id: req.body.idEstado})
            .then(() => {
                req.flash("Log", `Estado ${req.body.txtNomeEstado} removido`);
                res.redirect("/Lista/Estado");
            })
            .catch((err) => {
                req.flash("Erro", `Erro ao apagar o estado ${req.body.txtNomeEstado}. ${err}`);
                res.redirect("/Lista/Estado");
            });
    } else {
        req.flash("Erro", `Não é possível apagar este estado pois ainda existem ${cidades} cidades apontando para ele!`);
        res.redirect("/Lista/Estado");
    }
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
            req.flash("error_msg", "Erro ao listar bancos " + err);
            res.redirect("/");
        });
});

routerLista.post("/Banco/add", (req, res) => {
    const destino = "/Lista/Banco";
    const nomeObjeto = "Banco";

    if(req.body.idBanco) {
        Banco.findOne({_id: req.body.idBanco})
            .then((banco) => {
                banco.nome = req.body.txtNomeBanco;
                banco.modified = new Date();

                banco
                    .save()
                    .then(() => {
                        req.flash("Log", `${nomeObjeto} ${req.body.txtNomeBanco} editado com sucesso`);
                        res.redirect(destino);
                    })
                    .catch((err) => {
                        req.flash("Erro", `Erro ao editar o ${nomeObjeto.toLowerCase()} ${req.body.txtNomeBanco}. ${err}`);
                        res.redirect(destino);
                    });
            })
            .catch((err) => {
                req.flash("Erro", `Erro ao editar o ${nomeObjeto.toLowerCase()} ${req.body.txtNomeBanco}. ${err}`);
                res.redirect(destino);
            });
    } else {
        new Banco(
            {
                nome: req.body.txtNomeBanco
            })
            .save()
            .then(() => {
                req.flash("Log", `${nomeObjeto} ${req.body.txtNomeBanco} incluído com sucesso`);
                res.redirect(destino);
            })
            .catch((err) => {
                req.flash("Erro", `Erro ao incluir o ${nomeObjeto.toLowerCase()} ${req.body.txtNomeBanco}. ${err}`);
                res.redirect(destino);
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