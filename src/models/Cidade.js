const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Cidade = new Schema({
    nome: {
        type: String,
        required: true
    },
    estado: {
        type: mongoose.Types.ObjectId,
        ref: "estados",
        required: true
    },
    codigoArea: {
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

mongoose.model("cidades", Cidade);