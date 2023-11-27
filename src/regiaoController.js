const db = require('./db');//IMPORTA CONN BD.

const Joi = require('joi'); //joi valida estrutura

const regiaoSchema = Joi.object({
    id: Joi.string().required(),
    nome_regiao: Joi.string().required(),
    bairros: Joi.string().required(),
});

//Listar regiao
exports.listarRegiao = (req, res) => {
    db.query('SELECT * FROM regiao', (err, result) => {
        if (err) {
            console.error('Erro ao buscar regiao:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
            return;
        }
        res.json(result);
    });
};

//Buscar regiao por ID
exports.buscarRegiao = (req, res) => {
    const { id } = req.params;

    db.query('SELECT * FROM regiao WHERE id = ?', id, (err, result) => {
        if (err) {
            console.error('Erro ao buscar regiao:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
        }
    
        if (result.length === 0) {
            res.status(404).json({ error: 'Região não encontrado' });
            return;
        }

        res.json(result[0]);
    });
};

//Adicionar uma nova região - 27-11-2023
exports.adicionarRegiao = (req, res) => {
    const { id, nome_regiao, bairros} = req.body; 

    const { error } = regiaoSchema.validate({ id, nome_regiao, bairros});

    if (error) {
        res.status(400).json({ error: 'Dados de região inválidos' });
        return;
    }

    const novaRegiao = {
        id,
        nome_regiao,
        bairros
    };

    db.query('INSERTO INTO regiao SET ?', novaRegiao, (err, result) => {
        if (err) {
            console.error('Erro ao adicionar região:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
            return;
        }
        res.json({ message: 'Região adicionado com sucesso' });
    });
};

//Atualizar região
exports.atualizarRegiao = (req, res) => {
    const { id } = req.params;
    const { nome_regiao, bairros} = req.body;

    const { error } = regiaoSchema.validate({ id, nome_regiao, bairros });

    if (error) {
        res.status(400).json({ error: 'Dados de região inválidos ' });
        return;
    }

    const regiaoAtualizada = {
        nome_regiao,
        bairros
    };

    db.query('UPDATE cliente SET ? WHERE id = ?', [regiaoAtualizada, id], (err, result) => {
        if (err) {
            console.error('Erro ao atualizar região:', err);
            res.status(500).json({ error: 'Erro interno do servidor'});
            return;
        }
        res.json({ message: 'Região atualizada com sucesso' });
    });
};

// Deletar uma região
exports.deletarRegiao = (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM cliente WHERE id = ?', id, (err, result) => {
        if (err) {
            console.error('Erro ao deletar região:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
            return;
        }
        res.json({ message: 'Região deletada com sucesso' });
    });
};

// REGIAO - id INT, nome_regiao varchar(30), bairros varchar(300)