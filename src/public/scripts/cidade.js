window.addEventListener("load", () => {
    // eslint-disable-next-line no-undef
    document.getElementById("modalForm")
        .addEventListener("shown.bs.modal", () => {
            document.getElementById("hdEstado").value = document.getElementById("dropEstado").value;
        });
    
    const drop = document.getElementById("dropEstado");
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
        if(!endereco.endsWith("Cidade")) {
            endereco = endereco.substring(0, endereco.lastIndexOf("/"));
        }
        document.location.href = endereco + "/" + document.getElementById("dropEstado").value;
    });

    const txt = document.getElementById("txtCodigoArea");
    txt.setAttribute("title", "Código de área da cidade com 3 dígitos");
    txt.addEventListener("keyup", function() {
        this.value = this.value.replace(/\D/g, ""); 
        let txt = this.value.trim();

        if(txt.length < 3) {
            this.classList.remove( "is-valid" );
            this.classList.add( "is-invalid" );
        } else {
            this.classList.add( "is-valid" );
            this.classList.remove( "is-invalid" );
        }
    });
});

// eslint-disable-next-line no-unused-vars
const _preencheForm = (id) => {
    let nome = document.getElementById(id).lastChild.innerHTML.trim();
    let codigo = document.querySelector(`#cidade-${id} span[name='codigo']`).innerHTML;

    document.getElementById("idCidade").value = id;
    document.getElementById("txtNomeCidade").value = nome;
    document.getElementById("hdEstado").value = document.getElementById("dropEstado").value;
    document.getElementById("txtCodigoArea").value = codigo;
};

// eslint-disable-next-line no-unused-vars
const _verificaDup = () => {
    let autoriza = true;
    const lst = document.getElementsByName("cidade");

    const id = document.getElementById("idCidade").value;
    const nomeEditado = document.getElementById("txtNomeCidade").value;
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
const _validaForm = () => {
    let retorno = document.getElementById("txtCodigoArea").value.trim().length == 3;
    return(retorno);
};