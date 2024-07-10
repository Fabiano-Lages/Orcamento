const _Porta = 3200;
const _DirName = require.main.path;

const _Banco = `mongodb+srv://${process.env.USUARIO_BANCO}:${process.env.PASS}@orcamento.xhdtuq5.mongodb.net/Orcamento?retryWrites=true&w=majority&appName=Orcamento`;

module.exports = { _Porta, _DirName, _Banco };