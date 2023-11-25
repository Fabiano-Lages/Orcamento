window.addEventListener("load", () => {
    const tool = document.querySelectorAll("[data-bs-title]");
    // eslint-disable-next-line no-undef
    tool.forEach(it => bootstrap.Tooltip.getOrCreateInstance(it));

});

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