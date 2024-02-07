const express = require('express'); //IMPORTANDO EXPRESS
const path = require('path'); //IMPORTANDO PATH
//O PATH RETORNA O CAMINHO DE FORMA DINAMICA

//PEGAR DO INDEX
const router = express.Router();
//O ISSO PERMITE QUE A GENTE CRIE DIFERENTES URLs E ENDPOINTs PARA QUE O FRONTEND POSSA FAZER CHAMADAS

//PEGAR DO INDEX
router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + '/pages/home.html'))
}) //SEGUIR INDEX
//AQUI DEFINIMOS NOSSA ROTA PARA O ARQUIVO HTML USANDO O PATH PARA SEMPRE RETORNAR DINAMICAMENTE O QUE VEM ANTES DA "/pages/homt.html"
//TUDO QUE SE ENCONTRA DEPOIS DA BARRA "/" SERÃO NOSSAS ROTAS.


//CHAMANDO O ARQUIVO QUE CONTROLA O CLIENTE
const clienteController = require('./clienteController');

const loginController = require('./loginController');
//CHAMANDO O ARQUIVO QUE CONTROLA O LOGIN

//router.use('/clientes',loginController.autenticarToken); 
//autentica quando todos os campos do cliente 

//Rotas para clientes passando pela autenticação do token
router.get('/clientes', loginController.autenticarToken, clienteController.listarClientes);
router.get('/clientes/:cpf', clienteController.buscarCliente);

//POST: Aceita criar algum objeto do servidor.
router.post('/clientes', clienteController.adicionarCliente);

//PUT: Aceita substituir algum objeto do servidor. ALTERAÇÃO POR COMPLETO -- INCLUINDO O CPF QUE É A PK.
//PATCH: Aceita alterar algum objeto do servidor.
router.patch('/clientes/:cpf', loginController.autenticarToken, clienteController.atualizarCliente);

//DELETE: Informa por meio do URL o objeto a ser deletado.
router.delete('/clientes/:cpf', loginController.autenticarToken, clienteController.deletarCliente);



// Controla Produto
const produtoController = require('./produtoController');
//Rotas para produto 
router.get('/produtos', produtoController.listarProduto);
router.get('/produtos/:id', produtoController.buscarProduto);
router.get('/produtos/nome/:nome_produto', produtoController.buscarProdutoNome);
//POST: produto
router.post('/produtos', loginController.autenticarToken, produtoController.adicionarProduto);
//PATCH
router.patch('/produtos/:id', loginController.autenticarToken, produtoController.atualizarProduto);
//DELETE
router.delete('/produtos/:id', loginController.autenticarToken, produtoController.deletarProduto);

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

router.use('/pedido', loginController.autenticarToken);
//Rotas para pedido

router.get('/pedido', pedidoController.listarPedido);
router.get('/pedido/:id', pedidoController.buscarPedido);
router.get('/pedido/cpf/:cpf', pedidoController.buscarPedidoCpf);
//POST
router.post('/pedido', pedidoController.adicionarPedido);
//PATCH
router.patch('/pedido/:id', pedidoController.atualizarPedido);
//DELETE
router.delete('/pedido/:id', pedidoController.deletarPedido);

//Controle Item_Pedido (ITEM_PEDIDO - int INT, qtde TINYINIT, valor_parcial decimal(7,2), (FK)id_produto INT, (FK)id_pedido)
const itemPedidoController = require('./itemPedidoController');
//Rotas para item_pedido
router.get('/itemPedido', itemPedidoController.listarItemPedido);
router.get('/itemPedido', itemPedidoController.buscarItemPedido);
//POST
router.post('/itemPedido', itemPedidoController.adicionarItemPedido);
//PATCH
router.patch('/itemPedido/:id', itemPedidoController.atualizarItemPedido);
//DELETE
router.delete('/itemPedido/:id', itemPedidoController.deletarItemPedido);

//Rota para o login
router.post('/login', loginController.loginCliente);






module.exports = router;