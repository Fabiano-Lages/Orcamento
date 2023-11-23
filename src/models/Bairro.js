const { default: mongoose } = require("mongoose");

const schema = require("mongoose").schema();

const Bairro = new schema({
    nome: {
        type: String,
        require: true
    },
    cidade: {
        type: String,
        require: true
    }
});

mongoose.model("Bairro", Bairro );