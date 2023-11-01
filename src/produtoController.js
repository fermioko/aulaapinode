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

//Adicionar um novo Produto






/* PRODUTO - id, nome_produto, descricao, valor, imagem
id int / nome_produto varchar(30)/ descricao varchar(200) / valor decimal(6,2)/imagem varchar(200)
*/