const UserService = require('../service/userService');
const ErrorHandler = require('../lib/ErrorHandler');
const jwt = require('jsonwebtoken');

class UserController {
    static async createUser(req, res) {
        try {
            console.log("Iniciando login");
            const user = await UserService.createUser(req.body);
            res.status(201).json(user);
        } catch (error) {
            ErrorHandler.handleError(res, error);
        }
    }

    static async getUser(req, res) {
        try {
            const users = await UserService.getUsers(req.query);
            res.status(200).json(users);
        } catch (error) {
            ErrorHandler.handleError(res, error);
        }
    }

    static async updateUser(req, res) {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader) {
                return res.status(401).json({ error: 'Token não fornecido' });
            }
            const token = authHeader.split(' ')[1];

            const user = await UserService.updateUser(req.params.id || req.query.id, req.body, token);
            res.status(200).json(user);
        } catch (error) {
            ErrorHandler.handleError(res, error);
        }
    }

    static async login(req, res) {
        try {
            const { token, userId } = await UserService.login(req.body.email, req.body.senha);
            res.status(200).json({ token, userId });
        } catch (error) {
            ErrorHandler.handleError(res, error);
        }
    }

    static async validateToken(req, res) {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader) {
                return res.status(401).json({ valid: false, error: 'Token não fornecido' });
            }
            const token = authHeader.split(' ')[1];
            const decoded = UserService.validateToken(token);
            res.status(200).json({ valid: true, decoded });
        } catch (error) {
            ErrorHandler.handleError(res, error);
        }
    }

    static async deleteUser(req, res) {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader) {
                return res.status(401).json({ error: 'Token não fornecido' });
            }

            const token = authHeader.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            if (decoded.role !== 'admin') {
                return res.status(403).json({ error: 'Acesso negado. Apenas administradores podem excluir usuários.' });
            }

            await UserService.deleteUser(req.params.id);
            res.status(200).json({ message: 'Usuário excluído com sucesso.' });
        } catch (error) {
            ErrorHandler.handleError(res, error);
        }
    }
}

module.exports = UserController;