const schema = require("mongoose").schema();

const EstadoSchema = new schema({
    nome: {
        type: String,
        require: true
    }
});

module.exports = { EstadoSchema };