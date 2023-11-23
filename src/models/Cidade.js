const schema = require("mongoose").schema();

const CidadeSchema = new schema({
    nome: {
        type: String,
        require: true
    },
    Estado: {
        type: String,
        require: true
    }
});

module.exports = { CidadeSchema };