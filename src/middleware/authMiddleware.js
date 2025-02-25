const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY || '#$%123@2024';
const UserService = require('../service/userService');

const authenticateToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ error: 'Token não fornecido' });
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: 'Token inválido ou ausente' });
        }

        const decoded = UserService.validateToken(token);

        if (!decoded) {
            return res.status(403).json({ error: 'Token inválido ou expirado' });
        }

        req.user = decoded; // Armazena os dados decodificados no request para uso posterior
        next();
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao autenticar token', details: error.message });
    }
};

module.exports = authenticateToken;
