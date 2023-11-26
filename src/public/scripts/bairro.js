window.addEventListener("load", () => {
    // eslint-disable-next-line no-undef
    document.getElementById("modalForm")
        .addEventListener("shown.bs.modal", () => {
            document.getElementById("hdCidade").value = document.getElementById("dropCidade").value;
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
        let endereco = document.location.href;
        if(!endereco.endsWith("Bairro")) {
            endereco = endereco.substring(0, endereco.lastIndexOf("/"));
        }
        document.location.href = endereco + "/" + document.getElementById("dropCidade").value;
    });
});

// eslint-disable-next-line no-unused-vars
const _preencheForm = (id) => {
    let nome = document.getElementById(id).lastChild.innerHTML.trim();

    document.getElementById("idBairro").value = id;
    document.getElementById("txtNomeBairro").value = nome;
    document.getElementById("hdCidade").value = document.getElementById("dropCidade").value;
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