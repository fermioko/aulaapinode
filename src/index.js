//Criando o index.js
//CRIAÇÃO DE UMA APLICAÇÃO EXPRESS
const express = require('express'); //IMPORTANDO EXPRESS

const path = require('path'); //IMPORTANDO PATH
//O PATH RETORNA O CAMINHO DE FORMA DINAMICA

const app = express();
//O APP IRÁ RECEBER O EXPRESS E TODAS SUAS DEPENDÊNCIAS

const router = express.Router();
//O ISSO PERMITE QUE A GENTE CRIE DIFERENTES URLs E ENDPOINTs PARA QUE O FRONTEND POSSA FAZER CHAMADAS

router.get("/", (req, res) =>{
    res.sendFile(path.join(__dirname + '/pages/home.html'))
})

//AQUI DEFINIMOS NOSSA ROTA PARA O ARQUIVO HTML USANDO O PATH PARA SEMPRE RETORNAR DINAMICAMENTE O QUE VEM ANTES DA "/pages/homt.html"
//TUDO QUE SE ENCONTRA DEPOIS DA BARRA "/" SERÃO NOSSAS ROTAS.

app.use(router);
//APÓS DECLARAR NOSSAS ROTAS, AQUI FALAMOS PARA NOSSO APP USAR ELAS COMO REFERÊNCIA

app.listen(3333, ()=>{
    console.log('SERVIDOR RODANDO TERMINAL')
})
//AQUI DEFINIMOS QUEM DEFINIMOS QUEM IRÁ ESCUTAR NOSSO CHAMADO E NOS RESPONDER

app.get('/hello', (req, res) => {
    console.log('GET FUNCIONANDO');
    res.send({message: 'Hello World!!!'});
})
//dentro do get ja definimos uma função anonima CALLBACK, que recebe uma requisição com o REQUEST e que retorna uma resposta com o REPLY
app.get('/usuario', (req, res) => {
    console.log('GET USUÁRIO FUNCIONANDO');
    res.send({usuario: 'SANDRO'});
} )

