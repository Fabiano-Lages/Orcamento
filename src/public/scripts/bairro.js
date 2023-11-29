window.addEventListener("load", () => {
    // eslint-disable-next-line no-undef
    document.getElementById("modalForm")
        .addEventListener("shown.bs.modal", () => {
            document.getElementById("hdCidade").value = document.getElementById("dropCidade").value;
            document.getElementById("hdEstado").value = document.getElementById("dropEstado").value;
        });
    
    const drop = document.getElementById("dropCidade");
    let selecionado = drop.getAttribute("selecionado");
    if(selecionado) {
        for(let o = 0; o < drop.options.length; o++) {
            if(drop.options[o].value == selecionado) {
                drop.selectedIndex = o;
                break;
            }
        }
    }

    drop.addEventListener("change", () => {
        carregaEndereco();
    });
    
    document.getElementById("dropEstado")
        .addEventListener("change", function() {
            const dropCidade = document.getElementById("dropCidade");
            for(let o = dropCidade.options.length - 1; o >= 0; o--) {
                dropCidade.removeChild(dropCidade.options[o]);
            }

            if(this.value) {
                const xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                        let resp = xhttp.responseText;
                        if(resp) {
                            let lst = JSON.parse(resp);
                            let opcao = document.createElement("option");
                            opcao.value = "";

                            if(lst.length) {
                                limpaCartoes("Selecione uma cidade");

                                opcao.text = "Selecione uma cidade";
                                dropCidade.append(opcao);

                                lst.forEach(op => {
                                    opcao = document.createElement("option");
                                    opcao.value = op.cidade.id;
                                    opcao.text = op.cidade.nome;
                                    dropCidade.append(opcao);
                                });
                            } else {
                                limpaCartoes("Nenhume cidade encontrada para este Estado");

                                opcao.text = "Nenhume cidade encontrada para este Estado";
                                dropCidade.append(opcao);
                            }
                        }
                    }
                };
                xhttp.open("GET", `/Lista/Cidade/Busca/${this.value}`, true);
                xhttp.send();
            }
        });
});

const carregaEndereco = () => {
    const cidade = document.getElementById("dropCidade").value;
    if(cidade) {
        limpaCartoes("Carregando...");
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                let resp = xhttp.responseText;
                if(resp) {
                    const painel = document.getElementById("pnListagem");
                    let lst = JSON.parse(resp);
                    if(lst.length) {
                        limpaCartoes();
                        lst.forEach(obj => painel.appendChild(criarCartao(null, obj)));
                    } else {
                        limpaCartoes("Nenhum bairro encontrado");
                    }

                    // eslint-disable-next-line no-undef
                    ativaBotoes(document.getElementById("frmEdicao"));
                }
            }
        };
        xhttp.open("GET", `/Lista/Bairro/Busca/${cidade}`, true);
        xhttp.send();
    } else {
        limpaCartoes("Selecione uma cidade");
    }
};

// eslint-disable-next-line no-unused-vars
const _preencheForm = (id) => {
    let nome = document.getElementById(id).lastChild.innerHTML.trim();

    document.getElementById("idBairro").value = id;
    document.getElementById("txtNomeBairro").value = nome;
};

// eslint-disable-next-line no-unused-vars
const _verificaDup = () => {
    let autoriza = true;
    const lst = document.getElementsByName("bairro");

    const id = document.getElementById("idBairro").value;
    const nomeEditado = document.getElementById("txtNomeBairro").value;
    lst.forEach(nm => {
        if(autoriza && nm.innerHTML == nomeEditado) {
            if(!id || id != nm.parentNode.id) {
                autoriza = false;
            }         
        }
    });

    return(autoriza);
};

const limpaCartoes = (msg) => {
    const painel = document.getElementById("pnListagem");
    const lstBairro = painel.childNodes;
    for(let o = lstBairro.length - 1; o >= 0; o--) {
        painel.removeChild(lstBairro[o]);
    }

    if(msg) {
        painel.appendChild(criarCartao(msg));
    }
};

const criarCartao = (texto, obj) => {
    const retorno = document.createElement("div");
    retorno.classList.add("card", "mt-4");

    if(obj) {
        const bairro = obj.bairro;
        let painel, painel2, painel3, aux;
        retorno.setAttribute("id", `bairro-${bairro.id}`);

        painel = document.createElement("div");
        retorno.appendChild(painel);

        painel.classList.add("card-body");
        
        painel2 = document.createElement("div");
        painel.appendChild(painel2);

        painel2.classList.add("d-flex");
        
        aux = document.createElement("h6");
        painel2.appendChild(aux);

        aux.setAttribute("id", bairro.id);
        aux.innerHTML = `Nome: <span class="fw-normal" name="bairro">${bairro.nome}</span>`;

        painel3 = document.createElement("div");
        painel2.appendChild(painel3);

        painel3.classList.add("d-flex", "ms-auto");
        aux = document.createElement("button");
        painel3.appendChild(aux);

        aux.setAttribute("type", "button");
        aux.setAttribute("aria-label", `Edita o bairro ${bairro.nome}`);
        aux.setAttribute("data-bs-title", `Edita o bairro ${bairro.nome}`);
        aux.setAttribute("data-bs-placement", "left");
        aux.classList.add("btn", "btn-sm", "editar");
        aux.value = `${bairro.id}`;
        aux.innerHTML = "<i class='bi bi-pencil-square'></i>";

        painel3.classList.add("d-flex", "ms-auto");
        aux = document.createElement("button");
        painel3.appendChild(aux);

        aux.setAttribute("type", "button");
        aux.setAttribute("aria-label", `Exclui o bairro ${bairro.nome}`);
        aux.setAttribute("data-bs-title", `Exclui o bairro ${bairro.nome}`);
        aux.setAttribute("data-bs-placement", "bottom");
        aux.classList.add("btn", "btn-sm", "excluir");
        aux.value = `${bairro.id}`;
        aux.innerHTML = "<i class='bi bi-trash3'></i>";

        painel = document.createElement("div");
        retorno.appendChild(painel);

        painel.classList.add("card-footer", "d-flex", "justify-content-around", "fts-italic");
        painel.innerHTML = `<small>Criado em ${bairro.created}</small>` + 
                           `<small>Modificado em ${bairro.modified}</small>`;
    } else {
        let painel = document.createElement("div");
        painel.classList.add("card-body");
        painel.innerHTML = `<h6 class='opacity-75'>${texto}</h6>`;
        retorno.appendChild(painel);
    }

    return(retorno);
};