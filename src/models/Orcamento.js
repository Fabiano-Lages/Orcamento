const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Orcamento = new Schema({
    cliente: {
        type: mongoose.Types.ObjectId,
        ref: "clientes",
        required: true
    },
    descricao: {
        type: String,
        required: true
    },
    valor: {
        type: Number,
        required: true
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

mongoose.model("orcamentos", Orcamento);