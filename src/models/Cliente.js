const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Cliente = new Schema({
    nome: {
        type: String,
        required: true
    },
    endereco: {
        type: String
    },
    numero: {
        type: Number
    },
    complemento: {
        type: String
    },
    bairro: {
        type: mongoose.Types.ObjectId,
        ref: "bairros",
    },
    cidade: {
        type: mongoose.Types.ObjectId,
        ref: "cidades",
    },
    estado: {
        type: mongoose.Types.ObjectId,
        ref: "estados",
    },
    cep: {
        type: String
    },
    created: {
        type: Date,
        required: true,
        default: Date.now()
    },
    modified: {
        type: Date,
        required: true,
        default: Date.now()
    }
});

mongoose.model("clientes", Cliente);