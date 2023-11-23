const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Banco = new Schema({
    nome: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now()
    },
    modified: {
        type: Date,
        default: Date.now()
    }
});

mongoose.model("bancos", Banco);