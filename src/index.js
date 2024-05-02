//Criando o index.js
//CRIAÇÃO DE UMA APLICAÇÃO EXPRESS
const express = require('express'); //IMPORTANDO EXPRESS

const path = require('path'); //IMPORTANDO PATH
//O PATH RETORNA O CAMINHO DE FORMA DINAMICA

const db = require('./db'); //IMPORTANDO O NOSSO MÓDULO DE CONEXÃÕ COM O BANCO.

const app = express();
//O APP IRÁ RECEBER O EXPRESS E TODAS SUAS DEPENDÊNCIAS

const cors = require('cors');

//** Configuração das rotas **/
const routes = require('./routes'); //CHAMANDO O MÓDULO DAS ROTAS

//**INCLUIR NOVO **//
app.use(express.json()); // AQUI TRANSFORMAMOS OS DADOS QUE CHEGAM COMO BINARIO EM JSON

app.use((req, res, next) =>{
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers: Content-Type')
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')

    app.use(cors())
    next()
})

app.use('/', routes);
//APÓS DECLARAR NOSSAS ROTAS, AQUI FALAMOS PARA NOSSO APP USAR ELAS COMO REFERÊNCIA

app.listen(3333, ()=>{
    console.log('SERVIDOR RODANDO TERMINAL')
})
//AQUI DEFINIMOS QUEM DEFINIMOS QUEM IRÁ ESCUTAR NOSSO CHAMADO E NOS RESPONDER

