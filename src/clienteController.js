const db = require('./db');//IMPORTANDO O NOSSO MÓDULO DE CONEXÃO COM O BANCO.

const Joi = require('joi');
//JOI - valida se esta estrutura

const bcrypt = require('bcrypt');

//Validação dos dados
const clienteSchema = Joi.object({
    cpf: Joi.string().length(11).required(),
    nome: Joi.string().required(),
    endereco: Joi.string().required(),
    bairro: Joi.string().required(),
    complemento: Joi.string().required(),
    cep: Joi.string().required(),
    telefone: Joi.string().required(),
    email: Joi.string().email().required(),
});

//Listar todos os clientes
//Query acessa objeto de querystring da requisição
exports.listarClientes = (req, res) => {
    db.query('SELECT * FROM cliente', (err, result) => {
        if (err) {
            console.error('Erro ao buscar clientes:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
            return;
        }
        res.json(result);
    });
};

//Buscar um único cliente por CPF
exports.buscarCliente = (req, res) => {
    const { cpf } = req.params;

    db.query('SELECT * FROM cliente WHERE cpf = ?', cpf, (err, result) => {
        if (err) {
            console.error('Erro ao buscar clientes:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
            return;
        }

        if (result.length === 0) {
            res.status(404).json({ error: 'Cliente não encontrado' });
            return;
        }

        res.json(result[0]);//Retorna o primeiro cliente encontrado (deve ser único)
    });
};

//Adicionar um novo cliente - 01-11-2023
exports.adicionarCliente = (req, res) => {
    const { cpf, nome, endereco, bairro, complemento, cep, telefone, email, senha } = req.body; // req.body acessa objeto do corpo da requisição que foi recebido.

    const { error } = clienteSchema.validate({ cpf, nome, endereco, bairro, complemento, cep, telefone, email, senha }); //clienteSchema aqui utilizamos o joi para verificar os dados recebidos e garantir a integridade para só depois adicionar no banco.

    if (error) {
        res.status(400).json({ error: 'Dados de cliente inválidos' });
        return;
    }

    bcrypt.hash(senha, 10, (err, hash) => {
        if (err) {
            console.error('Erro ao criptografar a senhas:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
        }

        const novoCliente = {
            cpf,
            nome,
            endereco,
            bairro,
            complemento,
            cep,
            telefone,
            email,
            senha: hash
        };

        db.query('INSERT INTO cliente SET ?', novoCliente, (err, result) => {
            if (err) {
                console.error('Erro ao adicionar cliente:', err);
                res.status(500).json({ error: 'Erro interno do servidor ' });
                return;
            }
            res.json({ message: 'Cliente adicionado com sucesso' });
        });
    });
};

//Atualizar um cliente
exports.atualizarCliente = (req, res) => {
    const { cpf } = req.params;
    const { nome, endereco, bairro, complemento, cep, telefone, email, senha } = req.body;

    const { error } = clienteSchema.validate({ cpf, nome, endereco, bairro, complemento, cep, telefone, email, senha });

    if (error) {
        res.status(400).json({ error: 'Dados de cliente inválidos ' });
        return;
    }

    const clienteAtualizado = {
        nome,
        endereco,
        bairro,
        complemento,
        cep,
        telefone,
        email
    };

    db.query('UPDATE cliente SET ? WHERE cpf = ?', [clienteAtualizado, cpf], (err, result) => {
        if (err) {
            console.error('Erro ao atualizar cliente:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
            return;
        }
        res.json({ message: 'Cliente atualizado com sucesso' });
    });
};

//DELETE - Deletar um cliente
exports.deletarCliente = (req, res) => {
    const { cpf } = req.params;

    db.query('DELETE FROM cliente WHERE cpf = ?', cpf, (err, result) => {
        if (err) {
            console.error('Erro ao deletar cliente:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
            return;
        }
        res.json({ message: 'Cliente deletado com sucesso' });
    });
};

