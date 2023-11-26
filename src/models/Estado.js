const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Estado = new Schema({
    nome: {
        type: String,
        required: true
    },
    sigla: {
        type: String,
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

mongoose.model("estados", Estado);