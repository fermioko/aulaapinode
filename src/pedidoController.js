// PEDIDO - id INT, forma_pagto varchar(12), qtde_itens TINYINT, valor_total decimal(8,2), (FK)cpf BIGINIT, (FK)id_entregador INT
const db = require('./db');

const Joi = require('joi');

const pedidoSchema = Joi.object({
    forma_pagto: Joi.string().required(),
    qtde_itens: Joi.string().required(),
    valor_total: Joi.string().required(),
    cpf: Joi.string().length(11).required(),
    id_entregador: Joi.string().required(),
});

//Listar todos os pedidos
exports.listarPedido = (req, res) => {
    db.query('SELECT * FROM pedido', (err, result) => {
        if (err) {
            console.error('Erro ao buscar pedido:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
            return;
        }
        res.json(result);
    });
 };

 //Buscar um único pedido
 exports.buscarPedido = (req, res) => {
    const { id } = req.params;

    db.query('SELECT * FROM pedido WHERE id = ?', id, (err, result) => {
        if (err) {
            console.error('Erro ao buscar entregador:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
            return;
        }

        if (result.length === 0) {
            res.status(404).json({ error: 'Pedido não encontrado' });
            return;
        }
        res.json(result[0]);
    });
 };

 //Buscar um CPF
 exports.buscarPedidoCpf = (req, res) => {
    const { cpf } = req.params;

    db.query('SELECT * FROM pedido WHERE cpf = ?', cpf, (err, result) => {
        if (err) {
            console.error('Erro ao buscar pedido por cpf:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
            return;
        }

        if (result.length === 0) {
            res.status(404).json({ error: 'Pedido não encontrado' });
            return;
        }
        res.json(result[0]);
    });
 };

 //Adicionar novo pedido
 exports.adicionarPedido = (req, res) => {
    const { forma_pagto, qtde_itens, valor_total, cpf, id_entregador } = req.body;

    const { error } = pedidoSchema.validate({ forma_pagto,qtde_itens, valor_total, cpf, id_entregador });

    if (error) {
        res.status(400).json({ error: 'Dados de pedido inválidos' });
        return;
    }

    const novoPedido = {
    
        forma_pagto,
        qtde_itens,
        valor_total,
        cpf,
        id_entregador
    };

    db.query('INSERT INTO pedido SET ?', novoPedido, (err, result) => {
        if (err) {
            console.error('Erro ao adcionar pedido:', err);
            res.status(500).json({ error: 'Erro interno do servidor'});
            return;
        }
        res.json({ message: 'Pedido adicionado com sucesso'});
    });
 };

 //Atualizar um pedido
 exports.atualizarPedido = (req, res) => {
    const { id } = req.params;
    const { forma_pagto, qtde_itens, valor_total, cpf, id_entregador } = req.body;

    const { error } = pedidoSchema.validate({  forma_pagto, qtde_itens, valor_total, cpf, id_entregador });

    if (error) {
        res.status(400).json({ error: 'Dados de pedido inválidos' });
        return;
    }

    const pedidoAtualizado = {
        forma_pagto,
        qtde_itens,
        valor_total,
        cpf,
        id_entregador
    };

    db.query('UPDATE pedido SET ? WHERE id = ?', [pedidoAtualizado, id], (err, result) => { 
        if (err) {
            console.error('Erro ao atualizar pedido:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
            return;
        }
        res.json({ message: 'Pedido atualizado com sucesso' });
    });
 };

//Deletar um pedido
exports.deletarPedido = (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM pedido WHERE id = ?', id, (err, result) => {
        if (err) {
            console.error('Erro ao deletar pedido:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
            return;
        }
        res.json({ message: 'Pedido deletado com sucesso' });
    });
};



 /*
 PEDIDO - id INT, forma_pagto varchar(12), qtde_itens TINYINT, valor_total decimal(8,2), (FK)cpf BIGINIT, (FK)id_entregador INT
 */

