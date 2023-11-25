window.addEventListener("load", () => {
    const frm = document.getElementById("frmBanco");

    modalBanco = document.getElementById("modalBanco");
    modalBanco.addEventListener("hidden.bs.modal", () => {
        frm.reset();
    });
    modalBanco.addEventListener("shown.bs.modal", () => {
        document.getElementById("txtNomeBanco").focus();
    });
    
    // eslint-disable-next-line no-undef
    modalBanco = new bootstrap.Modal(modalBanco);

    frm.addEventListener("submit", (ev) => {
        ev.preventDefault();
        if(verificaDuplicidade()) {
            frm.submit();
        } else {
            // eslint-disable-next-line no-undef
            appendAlert("Este banco já existe", "danger");
        }
    });

    document.querySelectorAll("button.editar")
        .forEach(btn => { 
            btn.addEventListener("click", (ev) => {
                let obj = ev.target;
                if(obj.tagName == "I") {
                    obj = obj.parentNode;
                }

                let id = obj.value;
                let nome = document.getElementById(id).lastChild.innerHTML.trim();

                document.getElementById("idBanco").value = id;
                document.getElementById("txtNomeBanco").value = nome;

                modalBanco.show();
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
                let nome = document.getElementById(id).lastChild.innerHTML.trim();

                document.getElementById("idBanco").value = id;
                document.getElementById("txtNomeBanco").value = nome;

                frm.action = "/Lista/Banco/del";
                frm.submit();
            });
        });
});

let modalBanco = null;

const verificaDuplicidade = () => {
    let autoriza = true;
    const lst = document.getElementsByName("banco");

    const id = document.getElementById("idBanco").value;
    const nomeEditado = document.getElementById("txtNomeBanco").value;
    lst.forEach(nm => {
        if(autoriza && nm.innerHTML == nomeEditado) {
            if(!id || id != nm.parentNode.id) {
                autoriza = false;
            }         
        }
    });

    return(autoriza);
};