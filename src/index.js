const express = require("express");
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const config = require("./config/config");
const routes = require("./routes/main");
const routesLista = require("./routes/lista");
const routesOrca = require("./routes/orcamento");
const routesCliente = require("./routes/cliente");
const session = require("express-session");
const flash = require("connect-flash");

const app = express(); 

app.use(session({
    secret: "ControleOrcamento",
    resave: true,
    saveUninitialized: true
}));
app.use(flash());

app.use((req, res, next) => {
    res.locals.Log = req.flash("Log");
    res.locals.Erro = req.flash("Erro");
    next();
});

app.engine("handlebars", handlebars.engine({defaultLayout: "principal"}));
app.set("view engine", "handlebars");
app.set("views", `${config._DirName}/views`);

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(express.static(config._DirName + "/public"));

app.use(routes.routerMain);
app.use("/Lista", routesLista.routerLista);
app.use("/Cliente", routesCliente.routerCliente);
app.use("/Orcamento", routesOrca.routerOrca);

app.listen(config._Porta, () => {
    console.log(`Aplicativo Orçamento escutando na porta ${config._Porta}`);
}); 