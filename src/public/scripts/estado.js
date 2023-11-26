window.addEventListener("load", () => {
    const txt = document.getElementById("txtSiglaEstado");
    txt.setAttribute("title", "Sigla do estado com 2 caracteres");
    txt.addEventListener("keyup", function() {
        validaSigla(this);
    });
    txt.addEventListener("blur", function() {
        validaSigla(this);
    });
});

// eslint-disable-next-line no-unused-vars
const _preencheForm = (id) => {
    let nome = document.getElementById(id).lastChild.innerHTML.trim();
    let sigla = document.querySelector(`#estado-${id} span[name='sigla']`).innerHTML;

    document.getElementById("idEstado").value = id;
    document.getElementById("txtNomeEstado").value = nome;
    document.getElementById("txtSiglaEstado").value = sigla;
};

// eslint-disable-next-line no-unused-vars
const _verificaDup = () => {
    let autoriza = true;
    const lst = document.getElementsByName("estado");

    const id = document.getElementById("idEstado").value;
    const nomeEditado = document.getElementById("txtNomeEstado").value;
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
    let retorno = document.getElementById("txtSiglaEstado").value.trim().length == 2;
    return(retorno);
};

const validaSigla = (campo) => {
    campo.value = campo.value.replace(/[^a-zA-Z]/g, "").toUpperCase();
    let txt = campo.value.trim();

    if(txt.length < 2) {
        campo.classList.remove( "is-valid" );
        campo.classList.add( "is-invalid" );
    } else {
        campo.classList.add( "is-valid" );
        campo.classList.remove( "is-invalid" );
    }
};