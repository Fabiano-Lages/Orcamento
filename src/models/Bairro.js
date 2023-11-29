const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Bairro = new Schema({
    nome: {
        type: String,
        require: true
    },
    cidade: {
        type: mongoose.Types.ObjectId,
        ref: "cidades",
        require: true
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

mongoose.model("bairros", Bairro);