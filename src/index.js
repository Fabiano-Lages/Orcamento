const express = require("express");
const config = require("./config/config");
const routes = require("./routes/main");

const app = express();
const port = config._Porta;

app.use(express.static(config._DirName + "/public"));

app.use(routes.router);

app.listen(port, () => {
    console.log(`Aplicativo Orçamento escutando na porta ${port}`);
});