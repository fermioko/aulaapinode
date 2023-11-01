const express = require('express'); //IMPORTANDO EXPRESS
const path = require('path'); //IMPORTANDO PATH
//O PATH RETORNA O CAMINHO DE FORMA DINAMICA

//PEGAR DO INDEX
const router = express.Router();
//O ISSO PERMITE QUE A GENTE CRIE DIFERENTES URLs E ENDPOINTs PARA QUE O FRONTEND POSSA FAZER CHAMADAS

//PEGAR DO INDEX
router.get("/", (req, res) =>{
    res.sendFile(path.join(__dirname + '/pages/home.html'))
}) //SEGUIR INDEX
//AQUI DEFINIMOS NOSSA ROTA PARA O ARQUIVO HTML USANDO O PATH PARA SEMPRE RETORNAR DINAMICAMENTE O QUE VEM ANTES DA "/pages/homt.html"
//TUDO QUE SE ENCONTRA DEPOIS DA BARRA "/" SERÃO NOSSAS ROTAS.

//CHAMANDO O ARQUIVO QUE CONTROLA O CLIENTE
const clienteController = require('./clienteController');

//Rotas para clientes
router.get('/clientes', clienteController.listarClientes);
router.get('/clientes/:cpf', clienteController.buscarCliente);

//POST: Aceita criar algum objeto do servidor.
router.post('/clientes', clienteController.adicionarCliente);

//PUT: Aceita substituir algum objeto do servidor. ALTERAÇÃO POR COMPLETO -- INCLUINDO O CPF QUE É A PK.
//PATCH: Aceita alterar algum objeto do servidor.
router.patch('/clientes/:cpf', clienteController.atualizarCliente);

//DELETE: Informa por meio do URL o objeto a ser deletado.
router.delete('/clientes/:cpf', clienteController.deletarCliente);


// Controla Produto
const produtoSchema = require('./produtoController');

//Rotas para produto 
router.get('/produtos', produtoController.listarProduto);
router.get('/produtos/:id', produtoController.listarProduto);










module.exports = router;