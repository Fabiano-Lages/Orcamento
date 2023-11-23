const express = require("express");
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const config = require("./config/config");
const routes = require("./routes/main");
const routesLista = require("./routes/lista");

const app = express(); 
app.engine("handlebars", handlebars.engine({defaultLayout: "principal"}));
app.set("view engine", "handlebars");
app.set("views", "C:/Repositório/js/node/app/Orcamento/src/views");

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(express.static(config._DirName + "/public"));

app.use(routes.routerMain);
app.use("/Lista", routesLista.routerLista);

app.listen(config._Porta, () => {
    console.log(`Aplicativo Orçamento escutando na porta ${config._Porta}`);
}); 