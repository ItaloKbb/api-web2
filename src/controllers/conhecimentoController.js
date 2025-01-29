const ConhecimentoService = require('../service/conhecimentosService');
const ErrorHandler = require('../lib/ErrorHandler');

// Retorna Conhecimentos com paginação
async function getAllConhecimentos(req, res) {
    try {
        const { limit = 10, page = 1, titulo} = req.query;

        const filters = {};
        if (titulo) filters.titulo = { contains: titulo, mode: 'insensitive' };

        const response = await ConhecimentoService.getAllConhecimentos(parseInt(limit), parseInt(page), filters);
        res.status(200).json(response);
    } catch (error) {
        ErrorHandler.handleError(res, error);
    }
}

async function getConhecimentoById(req, res) {
    try {
        const { id } = req.params;
        const conhecimento = await ConhecimentoService.getConhecimentoById(parseInt(id));
        if (!conhecimento) {
            return res.status(404).json({ error: "Conhecimento não encontrado" });
        }
        res.status(200).json(conhecimento);
    } catch (error) {
        ErrorHandler.handleError(res, error);
    }
}

// Cria um novo conhecimento
async function createConhecimento(req, res) {
    try {
        const conhecimento = await ConhecimentoService.createConhecimento(req.body);
        res.status(201).json(conhecimento);
    } catch (error) {
        ErrorHandler.handleError(res, error);
    }
}

// Atualiza um conhecimento por ID
async function updateConhecimento(req, res) {
    try {
        const { id } = req.params;
        const conhecimento = await ConhecimentoService.updateConhecimento(parseInt(id), req.body);
        res.status(200).json(conhecimento);
    } catch (error) {
        ErrorHandler.handleError(res, error);
    }
}

// Remove uma conhecimento por ID
async function deleteConhecimento(req, res) {
    try {
        const { id } = req.params;
        const response = await ConhecimentoService.deleteConhecimento(parseInt(id));
        res.status(204).send(response);
    } catch (error) {
        ErrorHandler.handleError(res, error);
    }
}

module.exports = {
    getAllConhecimentos,
    createConhecimento,
    updateConhecimento,
    deleteConhecimento,
    getConhecimentoById,
};