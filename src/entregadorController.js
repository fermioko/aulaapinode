//ENTREGADOR - id INT, cnh INT, nome_entregador varchar(50), telefone BIGINT, (FK) id_região INT
const db = require('./db');

const Joi = require('joi');

const entregadorSchema = Joi.object({
    id: Joi.string().required(),
    cnh: Joi.string().required(),
    nome_entregador: Joi.string().required(),
    telefone: Joi.string().required(),
    id_regiao: Joi.string().required(),
});

//Listar entregador
exports.listarEntregador = (req, res) => {
    db.query('SELECT * FROM entregador', (err, result) => {
        if (err) {
            console.error('Erro ao buscar clientes:', err);
            res.status(500).json({ erro: 'Erro interno do servidor' });
            return;
        }
        res.json(result);
    });
};

//Buscar um único entregador
exports.buscarEntregador = (req, res) => {
    const { id } = req.params;

    db.query('SELECT * FROM entregador WHERE id = ?', cpf, (err, result) => {
        if (err) {
            console.error('Erro ao buscar entregador:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
            return;
        }

        if (result.length === 0) {
            res.status(404).json({ error: 'Entregador não encontrado' });
            return;
        }
        
        res.json(result[0]);
    });
};

//Adicionar novo entregador
exports.adicionarEntregador = (req, res) => {
    const { id, cnh, nome_entregador, telefone, id_regiao} = req.body;

    const { error } = entregadorSchema.validate({ id, cnh, nome_entregador, telefone, id_regiao});

    if (error) {
        res.status(400).json({ error: 'Dados de entregador inválidos' });
        return;
    }

    const novoEntregador = {
        id,
        cnh,
        nome_entregador,
        telefone,
        id_regiao
    };

    db.query('INSERT INTO entregrador SET ?', novoEntregador, (err, result) => {
        if (err) {
            console.error('Erro ao adicionar entregador:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
            return;
        }
        res.json({ message: 'Entregador adicionado com sucesso' });
    });
};

//Atualizar um entregador
exports.atualizarEntregador = (req, res) => {
    const { id } = req.params;
    const { cnh, nome_entregador, telefone, id_região } = req.body;

    const { error } = entregadorSchema.validate({ id, cnh, nome_entregador, telefone, id_região });

    if (error) {
        res.status(400).json({ error: 'Dados de entregador inválidos' });
        return;
    }

    const entregadorAtualizado = {
        cnh,
        nome_entregador,
        telefone,
        id_regiao
    };

    db.query('UPDATE entregador SET ? WHERE id = ?', [entregadorAtualizado, id], (err, result) => {
        if (err) {
            console.error('Erro ao atualizar entregador:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
            return;
        }
        res.json({ message: 'Entregador atualizado com sucesso' });
    });
};

//Deletar um entregador
exports.deletarEntregador = (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM entregador WHERE id = ?', id, (err, result) => {
        if (err) {
            console.error('Erro ao deletar entregador:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
            return;
        }
        res.json({ message: 'Entregador deletado com sucesso'});
    });
 };

//ENTREGADOR - id INT, cnh INT, nome_entregador varchar(50), telefone BIGINT, (FK) id_região INT