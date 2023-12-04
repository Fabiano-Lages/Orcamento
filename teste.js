const fs = require("fs");
const obj = 
    {
        Produto: "produto 1",
        Custo: 15.25,
        DataCompra: new Date("2023-11-15 00:00:00"),
        DataVenda: null,
        ValorVenda: 25
    };

const arquivo = "./teste.json";
const conteudo = [];
fs.stat(arquivo, (err) => {
    if(!err) {
        const entrada = JSON.parse(fs.readFileSync(arquivo, "utf-8"));
        entrada.forEach(item => conteudo.push(item));
    }

    if(conteudo) {
        conteudo.push(obj);
        console.log(conteudo);
        fs.writeFileSync(arquivo, JSON.stringify(conteudo), "utf-8");
    }
});