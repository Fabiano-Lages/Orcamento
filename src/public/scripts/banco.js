window.addEventListener("load", () => {
    
});

// eslint-disable-next-line no-unused-vars
const _preencheForm = (id) => {
    let nome = document.getElementById(id).lastChild.innerHTML.trim();

    document.getElementById("idBanco").value = id;
    document.getElementById("txtNomeBanco").value = nome;

    document.getElementById("tituloModalForm").innerHTML = `Editando ${nome}`;
};

// eslint-disable-next-line no-unused-vars
const _verificaDup = () => {
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