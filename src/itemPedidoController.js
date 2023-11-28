//ITEM_PEDIDO - int INT, qtde TINYINIT, valor_parcial decimal(7,2), (FK)id_produto INT, (FK)id_pedido

const db = require('./db');

const Joi = require('joi');

const itemPedidoSchema = Joi.object({
    id: Joi.string().required(),
    qtde: Joi.string().required(),
    valor_parcial: Joi.string().required(),
    id_produto: Joi.string().required(),
    id_pedido: Joi.string().required(),
});

//Listar todos item_pedido
exports.listarItemPedido = (req, res) => {
    db.query('SELECT * FROM item_pedido', (err, result) => {
        if (err) {
            console.error('Erro ao buscar item pedido:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
            return;
        }
        res.json(result);
    });
};


// Buscar item_pedido único id
exports.buscarItemPedido = (req, res) => {
    const { id } = req.params;


    db.query('SELECT * FROM item_pedido WHERE id = ?', id, (err, result) => {
        if (err) {
            console.error('Erro ao buscar item pedido:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
            return;
        }
        if (result.length === 0) {
            res.status(404).json({ error: 'Item Pedido não encontrado' });
            return;
        }
        res.json(result[0]);
    });
};


//Adicionar novo item_pedido
exports.adicionarItemPedido = (req, res) => {
    const { id, qtde, valor_parcial, id_produto, id_pedido } = req.body;

    const { error } = itemPedidoSchema.validate({ id, qtde, valor_parcial, id_produto, id_pedido});

    if (error) {
        res.status(400).json({ error: 'Dados de item pedido inválidos'});
        return;
    }

    const novoItemPedido = {
        id,
        qtde,
        valor_parcial,
        id_produto,
        id_pedido
    };

    db.query('INSERT INTO item_pedido SET ?', novoItemPedido, (err, result) => {
        if (err) {
            console.error('Erro ao adicionar item pedido:', err);
            res.status(500).json({ error: 'Erro interno do servidor '});
            return;
        }
        res.json({ message: 'Item Pedido adicionado com sucesso' });
    });
};


//Atualizar um item_pedido
exports.atualizarItemPedido = (req, res) => {
    const { id } = req.params;
    const { qtde, valor_parcial, id_produto, id_pedido } = req.body;

    const { error } = itemPedidoSchema.validate({ id, qtde, valor_parcial, id_produto, id_pedido});

    if (error) {
        res.status(400).json({ error: 'Dados de item pedido inválidos '});
        return;
    }

    const itemPedidoAtualizado = {
        qtde,
        valor_parcial,
        id_produto,
        id_pedido
    };

    db.query('UPDATE item_pedido SET ? WHERE id = ?', [itemPedidoAtualizado, id], (err, result) => {
        if (err) {
            console.error('Erro ao atualizar item pedido:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
            return;
        }
        res.json({ message: 'Item Pedido atualizado com sucesso' });
    });
};

//Deletar um item_pedido
exports.deletarItemPedido = (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM item_pedido WHERE id = ?', id, (err, result) => {
        if (err) {
            console.error('Erro ao deletar Item Pedido:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
            return;
        }
        res.json({ message: 'Item Pedido deletado com sucesso'});
    });
};


/*
ITEM_PEDIDO - int INT, qtde TINYINIT, valor_parcial decimal(7,2), (FK)id_produto INT, (FK)id_pedido
*/
