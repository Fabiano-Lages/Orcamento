window.addEventListener("load", () => {
    const tool = document.querySelectorAll("[data-bs-title]");
    tool.forEach(it => Bootstrap.Tooltip.getOrCreateInstance(it));

    const frm = document.getElementById("frmEdicao");

    document.querySelectorAll("div.alert button")
        .forEach(btn => {
            setTimeout(() => {
                btn.click();
            }, 10000);
        });

    if(frm) {
        modalForm = document.getElementById("modalForm");
        modalForm.addEventListener("hidden.bs.modal", () => {
            document.getElementById("tituloModalForm").innerHTML = "Novo";
            frm.reset();
        });
        modalForm.addEventListener("shown.bs.modal", () => {
            document.getElementById(`txtNome${frm.getAttribute("tag")}`).focus();
        });
        
        modalForm = new Bootstrap.Modal(modalForm);

        frm.addEventListener("submit", (ev) => {
            ev.preventDefault();
            let duplo = verificaDuplicidade();
            let valido = validaForm();

            if(duplo && valido) {
                frm.submit();
            } else {
                if(!duplo) {
                    appendAlert(`Este ${frm.getAttribute("tag").toLowerCase()} já existe`, "danger");
                } else if (!valido) {
                    appendAlert("Preencha os campos corretamente", "danger");
                }
            }
        });
        
        ativaBotoes(frm);
    }
});

let modalForm = null;
// eslint-disable-next-line no-undef
const Bootstrap = bootstrap;

const preencheFormulario = (id) => {
    // eslint-disable-next-line no-constant-condition
    if(typeof(_preencheForm) != "undefined") {
        // eslint-disable-next-line no-undef
        _preencheForm(id);
    }
};

const verificaDuplicidade = () => {
    let retorno = false;

    // eslint-disable-next-line no-constant-condition
    if(typeof(_verificaDup) != "undefined") {
        // eslint-disable-next-line no-undef
        retorno = _verificaDup();
    }

    return(retorno);
};

const validaForm = () => {
    let retorno = true;
    
    // eslint-disable-next-line no-constant-condition
    if(typeof(_validaForm) != "undefined") {
        // eslint-disable-next-line no-undef
        retorno = _validaForm();
    }

    return(retorno);
};

// eslint-disable-next-line no-unused-vars
const appendAlert = (message, type) => {
    const data = new Date();
    let id = data.toLocaleDateString("pt-BR").split("/").reverse().join("");
    id += data.toLocaleTimeString("pt-BR").replaceAll(":", "");

    const wrapper = document.createElement("div");
    wrapper.innerHTML = `<div class='alert alert-${type} alert-dismissible' role='alert'>` + 
                            `<div>${message}</div>` + 
                            `<button id='${id}' type='button' class='btn-close' data-bs-dismiss='alert' aria-label='Close'></button>` + 
                        "</div>";
  
    document.getElementById("pnAlert").append(wrapper);
    setTimeout(() => {
        document.getElementById(id).click();
    }, 10000);
};

const ativaBotoes = (frm) =>{
    document.querySelectorAll("button.editar")
        .forEach(btn => { 
            btn.addEventListener("click", (ev) => {
                let obj = ev.target;
                if(obj.tagName == "I") {
                    obj = obj.parentNode;
                }

                let id = obj.value;
                preencheFormulario(id);
                modalForm.show();
            });
        });

    document.querySelectorAll("button.excluir")
        .forEach(btn => { 
            btn.addEventListener("click", (ev) => {
                let obj = ev.target;
                if(obj.tagName == "I") {
                    obj = obj.parentNode;
                }

                let id = obj.value;
                preencheFormulario(id);

                frm.action = `/Lista/${frm.getAttribute("tag")}/del`;
                frm.submit();
            });
        });
};