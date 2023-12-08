// PRODUTO - id, nome_produto, descricao, valor, imagem

const db = require('./db'); //importa BD

const Joi = require('joi'); //valida estrutura

//Validação dos dados
const produtoSchema = Joi.object({
    id: Joi.string().required(), 
    nome_produto: Joi.string().required(), 
    descricao: Joi.string().required(), 
    valor: Joi.string().required(), 
    imagem: Joi.string().required(),
});

//Listar produto
exports.listarProduto = (req, res) => {
    db.query('SELECT * FROM produto', (err, result) => {
        if (err) {
            console.error('Erro ao buscar produto:', err);
            res.status(500).json({ error: 'Erro interno do servidor'});
            return;            
        }
        res.json(result);
    });
};

exports.buscarProduto = (req, res) => {
    const { id } = req.params;

    db.query('SELECT * FROM produto WHERE id = ?', id, (err, result) => {
        if (err) {
            console.error('Erro ao buscar produto:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
            return;
        }

        if (result.length === 0) {
            res.status(404).json({ error: 'Produto não encontrado' });
            return;
        }

        res.json(result[0]); // Retorna o primeiro produto
    });
};

//Buscar produto por nome - 06-11-2023
exports.buscarProdutoNome = (req, res) => {
    const { nome_produto } = req.params; //acessa os parametros

    //LIKEcom o operador %
    db.query('SELECT * FROM produto WHERE nome_produto LIKE ?', [`%${nome_produto}%`], (err, result) => {
        if (err) {
            console.error('Erro ao buscar produto:', err);
            res.status(500).json({ error: 'Erro interno do servidor'});
            return;            
        }
        if (result === 0) {
            res.status(404).json({ error: 'Produto não encontrado'});
            return;
        }
        res.json(result); // RETORNA O PRIMEIRO PRODUTO ENCONTRADO
    });
};

//Adicionar um novo Produto
exports.adicionarProduto = (req, res) => {
    const {id, nome_produto, descricao, valor, imagem} = req.body;

    const { error } = produtoSchema.validate({id, nome_produto, descricao, valor, imagem });

    if (error) {
        res.status(400).json({ error: 'Dados de produto inválidados'});
        return;
    }

    const novoProduto = {
        id, 
        nome_produto, 
        descricao, 
        valor, 
        imagem
    };

    db.query('INSERT INTO produto SET ?', novoProduto, (err, result) => {
        if (err) {
            console.error('Erro ao adicionar produto:', err);
            res.status(500).json({ error: 'Erro interno do Servidor'});
            return;
        }
        res.json({ message: 'Produto adicionado com sucesso'});
    });
};

//ATUALIZAR UM PRODUTO
exports.atualizarProduto = (req, res) => {
    const { id } = req.params;
    const { nome_produto, descricao, valor, imagem } = req.body;

    const { error } = produtoSchema.validate({ id, nome_produto, descricao, valor, imagem });

    if (error) {
       res.status(400).json({ error: 'Dados de cliente inválidos '});
       return;
    }

    const produtoAtualizado = {
        id,
        nome_produto,
        descricao,
        valor,
        imagem 
    };

    db.query('UPDATE produto SET ? WHERE id = ?', [produtoAtualizado, id], (err, result) => {
        if (err) {
            console.error('Erro ao atualizar produto:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
            return;
        }
        res.json({ message: 'Produto atualizado com sucesso'});
    });
};

//DELETE produto
exports.deletarProduto = (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM produto WHERE id = ?', id, (err, result) => {
        if (err) {
            console.error('Erro ao deletar produto:', err);
            res.status(500).json({ error: 'Erro interno do servidor'});
            return;
        }
        res.json({ message: 'Produto deletado com sucesso:'});
    });
};

/* PRODUTO - id, nome_produto, descricao, valor, imagem
id int / nome_produto varchar(30)/ descricao varchar(200) / valor decimal(6,2)/imagem varchar(200)
*/