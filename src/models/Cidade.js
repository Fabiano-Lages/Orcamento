const mongoose = require("mongoose");
const schema = mongoose.schema();

const Cidade = new schema({
    nome: {
        type: String,
        require: true
    },
    estado: {
        type: mongoose.Types.ObjectId,
        ref: "estados",
        require: true
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