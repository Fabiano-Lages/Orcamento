window.addEventListener("load", () => {
    const txtCEP = document.getElementById("txtCEP");

    txtCEP.addEventListener("change", function() {
        // eslint-disable-next-line no-undef
        buscaCep(this)
            .then((resp) => {
                if(resp.resultado_txt.toLowerCase().indexOf("cep completo") > -1) {
                    document.getElementById("txtEndereco").value = `${resp.tipo_logradouro} ${resp.logradouro}`;
                    if(resp.uf) {
                        const dropEstado = document.getElementById("dropEstado");
                        const dropCidade = document.getElementById("dropCidade");
    
                        carregaEstado(resp.uf)
                            .then((lstEstado) => {
                                let opt;
                                const estado = lstEstado[0].estado;
                                for(let o = 1; o < dropEstado.childNodes.length; o++) {
                                    opt = dropEstado.childNodes[o];
                                    if(opt.value == estado.id) {
                                        opt.selected = true;
                                        if(preencheCidade(estado.cidades, null, resp.cidade)) {
                                            dropCidade.dispatchEvent(new Event("change"));

                                            setTimeout((bairro) => {
                                                carregaBairro(dropCidade.value)
                                                    .then((bairros) => {
                                                        preencheBairro(bairros, null, bairro);
                                                    })
                                                    .catch((err) => {
                                                        preencheBairro(null, err);
                                                    });
                                            }, 300, resp.bairro);

                                        }
                                        break;
                                    }
                                }

                            })
                            .catch((err) => {
                                console.log("Estado não cadastrado. " + err);
                            });
                    }
                }
            })
            .catch((msg) => {
                console.log(msg);
            });
    });

    txtCEP.addEventListener("keyup", function() {
        this.value = 
            this.value.replace(/\D/g, "")
                .replace(/(\d{2})(\d)/, "$1.$2")
                .replace(/(\d{3})(\d)/, "$1-$2")
                .replace(/(-\d{3})\d+?$/, "$1");
    });

    carregaEstado()
        .then((resp) => {
            const dropEstado = document.getElementById("dropEstado");
            let opt = document.createElement("option");
            opt.value = "";
            opt.text = "Selecione um estado";
            dropEstado.appendChild(opt);

            resp.forEach(it => {
                opt = document.createElement("option");
                opt.value = it.estado.id;
                opt.text = it.estado.nome;
                dropEstado.appendChild(opt);
            });
        })
        .catch((err) => {
            console.log(err);
        });
    
    document.getElementById("dropEstado").addEventListener("change", function() {
        const drop2 = document.getElementById("dropBairro");
        for(let o = drop2.childNodes.length - 1; o >= 0; o--) {
            drop2.removeChild(drop2.childNodes[o]);
        }

        if(this.value) {
            carregaCidade(this.value)
                .then((cidades) => {
                    preencheCidade(cidades);
                })
                .catch((err) => {
                    preencheCidade(null, err);
                });
        } else {
            preencheCidade(null, "Selecione um estado antes");
        }
    });
        
    document.getElementById("dropCidade").addEventListener("change", function() {
        if(this.value) {
            carregaBairro(this.value)
                .then((bairros) => {
                    preencheBairro(bairros);
                })
                .catch((err) => {
                    preencheBairro(null, err);
                });
        } else {
            preencheBairro(null, "Selecione uma cidade antes");
        }
    });
});

const preencheCidade = (cidades, msg, selecionada) => {
    let retorno = false;
    const drop = document.getElementById("dropCidade");
    for(let o = drop.childNodes.length - 1; o >= 0; o--) {
        drop.removeChild(drop.childNodes[o]);
    }

    let opt;
    if(cidades.length) {
        opt = document.createElement("option");
        opt.value = "";
        opt.text = "Selecione uma cidade";
        drop.appendChild(opt);

        cidades.forEach(it => {
            opt = document.createElement("option");
            opt.value = it.id ?? it.cidade.id;
            opt.text = it.nome ?? it.cidade.nome;
            if(selecionada && opt.text == selecionada) {
                opt.selected = true;
                retorno = true;
            }
            drop.appendChild(opt);
        });
    } else if(msg) {
        opt = document.createElement("option");
        opt.value = "";
        opt.text = msg;
        drop.appendChild(opt);
    } else {
        opt = document.createElement("option");
        opt.value = "";
        opt.text = "Nenhuma cidade cadastrada para este estado";
        drop.appendChild(opt);
    }

    return(retorno);
};

const preencheBairro = (bairros, msg, selecionado) => {
    let retorno = false;
    const drop = document.getElementById("dropBairro");
    for(let o = drop.childNodes.length - 1; o >= 0; o--) {
        drop.removeChild(drop.childNodes[o]);
    }

    let opt;
    if(bairros.length) {
        opt = document.createElement("option");
        opt.value = "";
        opt.text = "Selecione um bairro";
        drop.appendChild(opt);

        bairros.forEach(it => {
            opt = document.createElement("option");
            opt.value = it.bairro.id;
            opt.text = it.bairro.nome;
            if(selecionado && opt.text == selecionado) {
                opt.selected = true;
                retorno = true;
            }
            drop.appendChild(opt);
        });
    } else if(msg) {
        opt = document.createElement("option");
        opt.value = "";
        opt.text = msg;
        drop.appendChild(opt);
    } else {
        opt = document.createElement("option");
        opt.value = "";
        opt.text = "Nenhum bairro cadastrado para esta cidade";
        drop.appendChild(opt);
    }

    return(retorno);
};

const carregaEstado = (sigla) => {
    return(
        new Promise((resolve, reject) => {
            const xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4) {
                    if(this.status == 200) {
                        let resp = xhttp.responseText;
                        if(resp) {
                            resolve(JSON.parse(resp));
                        } else {
                            reject("Erro ao listar os estados");
                        }
                    } else {
                        reject("Erro ao listar os estados");
                    }
                }
            };
            if(sigla) {
                xhttp.open("GET", `/Lista/Estado/sigla/${sigla}`, true);
            } else {
                xhttp.open("GET", "/Lista/Estado/Lista", true);
            }
            xhttp.send();
        })
    );
};

const carregaCidade = (estado) => {
    return(
        new Promise((resolve, reject) => {
            const xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4) {
                    if(this.status == 200) {
                        let resp = xhttp.responseText;
                        if(resp) {
                            resolve(JSON.parse(resp));
                        } else {
                            reject("Erro ao listar as cidades");
                        }
                    } else {
                        reject("Erro ao listar as cidades");
                    }
                }
            };
            xhttp.open("GET", `/Lista/Cidade/Busca/${estado}`, true);
            xhttp.send();
        })
    );
};

const carregaBairro = (cidade) => {
    return(
        new Promise((resolve, reject) => {
            const xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4) {
                    if(this.status == 200) {
                        let resp = xhttp.responseText;
                        if(resp) {
                            resolve(JSON.parse(resp));
                        } else {
                            reject("Erro ao listar os bairros");
                        }
                    } else {
                        reject("Erro ao listar os bairros");
                    }
                }
            };
            xhttp.open("GET", `/Lista/Bairro/Busca/${cidade}`, true);
            xhttp.send();
        })
    );
};

// eslint-disable-next-line no-unused-vars
const _verificaDup = () => {
    let autoriza = true;
    const lst = document.getElementsByName("cliente");

    const id = document.getElementById("idCliente").value;
    const nomeEditado = document.getElementById("txtNomeCliente").value;
    lst.forEach(nm => {
        if(autoriza && nm.innerHTML == nomeEditado) {
            if(!id || id != nm.parentNode.id) {
                autoriza = false;
            }         
        }
    });

    return(autoriza);
};

// eslint-disable-next-line no-unused-vars
const _preencheForm = (id) => {
    let nome = document.getElementById(id).lastChild.innerHTML.trim();

    document.getElementById("idCliente").value = id;
    document.getElementById("txtNomeCliente").value = nome;
};