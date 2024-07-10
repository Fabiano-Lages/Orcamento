const mongoose = require("mongoose");
const cnf = require("./config");

mongoose.Promise = global.Promise;

mongoose.connect(cnf._Banco)
    .then(() => {
        console.log("Banco conectado");
    })
    .catch((err) => {
        console.log("Erro: " + err);
    });

const db = mongoose.connection;

module.exports = { db };