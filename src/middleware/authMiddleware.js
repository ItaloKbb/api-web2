const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY || '#$%123@2024';
const UserService = require('../service/userService');

const authenticateToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                error: {
                    message: 'Token não fornecido ou mal formatado',
                    code: 'UNAUTHORIZED',
                    details: 'O token deve estar no formato "Bearer <token>"'
                }
            });
        }

        const token = authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                error: {
                    message: 'Token ausente',
                    code: 'UNAUTHORIZED',
                    details: null
                }
            });
        }

        if (!SECRET_KEY) {
            return res.status(500).json({
                error: {
                    message: 'Erro interno: chave secreta não definida',
                    code: 'INTERNAL_SERVER_ERROR',
                    details: null
                }
            });
        }

        const decoded = UserService.validateToken(token);
        if(decoded){
          next();
        }

    } catch (error) {
        return res.status(500).json({
            error: {
                message: 'Erro ao autenticar token',
                code: 'INTERNAL_SERVER_ERROR',
                details: error.message
            }
        });
    }
};

module.exports = authenticateToken;