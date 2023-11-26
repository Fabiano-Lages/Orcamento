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
    }
});

mongoose.model("bairros", Bairro);