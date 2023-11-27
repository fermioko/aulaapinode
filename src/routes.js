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

const loginController = require('./loginController');
//CHAMANDO O ARQUIVO QUE CONTROLA O LOGIN

router.use('/clientes',loginController.autenticarToken); 
//autentica quando todos os campos do cliente 

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
const produtoController = require('./produtoController');
//Rotas para produto 
router.get('/produtos', produtoController.listarProduto);
router.get('/produtos/:id', produtoController.buscarProduto);
router.get('/produtos/nome/:nome_produto', produtoController.buscarProdutoNome);
//POST: produto
router.post('/produtos', produtoController.adicionarProduto);
//PATCH
router.patch('/produtos/:id', produtoController.atualizarProduto);
//DELETE
router.delete('/produtos/:id', produtoController.deletarProduto);

//Controle Regiao
const regiaoController = require('./regiaoController');
//Rotas para regiao
router.get('/regiao', regiaoController.listarRegiao);
router.get('/regiao/:id', regiaoController.buscarRegiao);
//POST
router.post('/regiao', regiaoController.adicionarRegiao);
//PATCH
router.patch('/regiao/:id', regiaoController.atualizarRegiao);
//DELETE
router.delete('/regiao/:id', regiaoController.deletarRegiao);


//Controle Entregador (ENTREGADOR - id INT, cnh INT, nome_entregador varchar(50), telefone BIGINT, (FK) id_região INT)
const entregadorController = require('./entregadorController');
//Rotas para entregado
router.get('/entregador', entregadorController.listarEntregador);
router.get('/entregador/:id', entregadorController.buscarEntregador);
//POST
router.post('/entregador', entregadorController.adicionarEntregador);
//PATCH
router.patch('/entregador/:id', entregadorController.atualizarEntregador);
//DELETE
router.delete('/entregador/:id', entregadorController.deletarEntregador);

//Controle Pedido ( PEDIDO - id INT, forma_pagto varchar(12), qtde_itens TINYINT, valor_total decimal(8,2), (FK)cpf BIGINIT, (FK)id_entregador INT)
const pedidoController = require('./pedidoController');
//Rotas para pedido
router.get('/pedido', pedidoController.listarPedido);
router.get('/pedido/:id', pedidoController.buscarPedido);
//POST
router.post('/pedido', pedidoController.adicionarPedido);
//PATCH
router.patch('/pedido/:id', pedidoController.atualizarPedido);
//DELETE
router.delete('/pedido/:id',pedidoController.deletarPedido);

//Controle Item_Pedido
//Rotas para item_pedido

/*
ITEM_PEDIDO - int INT, qtde TINYINIT, valor_parcial decimal(7,2), (FK)id_produto INT, (FK)id_pedido
*/








//Rota para o login
router.post('/login', loginController.loginCliente);






module.exports = router;