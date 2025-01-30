const UserConhecimentoService = require('../service/userConhecimentoService');
const ErrorHandler = require('../lib/ErrorHandler');

// Retorna UserConhecimentos com paginação
async function getAllUserConhecimentos(req, res) {
    try {
        const { limit = 10, page = 1, userId, conhecimentoId } = req.query;

        const filters = {};
        if (userId) filters.userId = parseInt(userId);
        if (conhecimentoId) filters.conhecimentoId = parseInt(conhecimentoId);

        const response = await UserConhecimentoService.getAllUserConhecimentos(parseInt(limit), parseInt(page), filters);
        res.status(200).json(response);
    } catch (error) {
        ErrorHandler.handleError(res, error);
    }
}

// Cria um novo UserConhecimento
async function createUserConhecimento(req, res) {
    try {
        const userConhecimento = await UserConhecimentoService.createUserConhecimento(req.body);
        res.status(201).json(userConhecimento);
    } catch (error) {
        ErrorHandler.handleError(res, error);
    }
}

// Retorna um UserConhecimento por ID
async function getUserConhecimentoById(req, res) {
    try {
        const { id } = req.params;
        const userConhecimento = await UserConhecimentoService.getUserConhecimentoById(parseInt(id));
        if (!userConhecimento) {
            return res.status(404).json({ error: "UserConhecimento não encontrado" });
        }
        res.status(200).json(userConhecimento);
    } catch (error) {
        ErrorHandler.handleError(res, error);
    }
}

// Atualiza um UserConhecimento por ID
async function updateUserConhecimento(req, res) {
    try {
        const { id } = req.params;
        const userConhecimento = await UserConhecimentoService.updateUserConhecimento(parseInt(id), req.body);
        res.status(200).json(userConhecimento);
    } catch (error) {
        ErrorHandler.handleError(res, error);
    }
}

// Remove um UserConhecimento por ID
async function deleteUserConhecimento(req, res) {
    try {
        const { id } = req.params;
        const response = await UserConhecimentoService.deleteUserConhecimento(parseInt(id));
        res.status(204).send(response);
    } catch (error) {
        ErrorHandler.handleError(res, error);
    }
}

module.exports = {
    getAllUserConhecimentos,
    createUserConhecimento,
    getUserConhecimentoById,
    updateUserConhecimento,
    deleteUserConhecimento,
};