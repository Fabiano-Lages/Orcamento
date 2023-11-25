const mongoose = require("mongoose");
const schema = mongoose.schema();

const Bairro = new schema({
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

mongoose.model("Bairro", Bairro );