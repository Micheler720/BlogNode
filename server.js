
const mongoose = require('mongoose');
require('dotenv').config({path:'variables.env'});
//Conexão ao banco de dados
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
} );
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (error)=>{
    console.error('Error: ' + error.message);
});

//carregando todos os models
require('./Models/Post');
const app = require('./app');
app.set('port',7777);
const server = app.listen(app.get('port'), ()=>{
    console.log("Servidor rodando na porta: " + server.address().port);
});