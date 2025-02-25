const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY || '#$%123@2024';

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
    } catch (error) {
        return res.status(500).json({
            error: {
                message: 'Erro ao autenticar token',
                code: 'INTERNAL_SERVER_ERROR',
                details: error.message
            }
        });
    }finally{
      next();
    }
};

module.exports = authenticateToken;