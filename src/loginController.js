const db = require('./db');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const SECRET = 'mioko';

exports.loginCliente = (req, res) => {
    const { cpf, senha } = req.body;

    db.query('SELECT * FROM cliente WHERE cpf = ?', cpf, (err, results) => {
        if (err) {
            console.error('Erro ao buscar cliente:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
            return;
        }

        if (results.length === 0) {
            res.status(401).json({ error: 'Cliente não encontrado' });
            return;
        }

        const cliente = results[0];

        //Comparar a senha inserida com a senha criptografada armazenada no banco de dados
        bcrypt.compare(senha, cliente.senha, (err, passwordMatch) => {
            if (err || !passwordMatch) {
                res.status(401).json({ error: 'Credenciais inválidas' });
            }else{
                const token = jwt.sign({ cpf: cliente.cpf }, SECRET, { expiresIn: '1h'});
                //sign assina o token gerado com info do meu usuário
                res.status(200).json({ 
                    auth: true,
                    token,
                    message: 'Usuário Logado'
                });
            }
        });

    });
};

exports.autenticarToken = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ error: 'Token não fornecido' });
    }
    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Token inválido' });
        }
        req.usuario = decoded;
        next();
    });
};