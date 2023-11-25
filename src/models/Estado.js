const mongoose = require("mongoose");
const schema = mongoose.schema();

const Estado = new schema({
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