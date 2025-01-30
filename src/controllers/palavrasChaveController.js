const PalavrasChaveService = require('../service/palavrasChaveService');
const ErrorHandler = require('../lib/ErrorHandler');

// Retorna Palavras-Chave com paginação
async function getAllPalavrasChave(req, res) {
    try {
        const { limit = 10, page = 1, texto } = req.query;

        const filters = {};
        if (texto) filters.texto = { contains: texto, mode: 'insensitive' };

        const response = await PalavrasChaveService.getAllPalavrasChave(parseInt(limit), parseInt(page), filters);
        res.status(200).json(response);
    } catch (error) {
        ErrorHandler.handleError(res, error);
    }
}

// Cria uma nova palavra-chave
async function createPalavraChave(req, res) {
    try {
        const palavraChave = await PalavrasChaveService.createPalavraChave(req.body);
        res.status(201).json(palavraChave);
    } catch (error) {
        ErrorHandler.handleError(res, error);
    }
}

// Retorna uma palavra-chave por ID
async function getPalavraChaveById(req, res) {
    try {
        const { id } = req.params;
        const palavraChave = await PalavrasChaveService.getPalavraChaveById(parseInt(id));
        if (!palavraChave) {
            return res.status(404).json({ error: "Palavra-chave não encontrada" });
        }
        res.status(200).json(palavraChave);
    } catch (error) {
        ErrorHandler.handleError(res, error);
    }
}

// Atualiza uma palavra-chave por ID
async function updatePalavraChave(req, res) {
    try {
        const { id } = req.params;
        const palavraChave = await PalavrasChaveService.updatePalavraChave(parseInt(id), req.body);
        res.status(200).json(palavraChave);
    } catch (error) {
        ErrorHandler.handleError(res, error);
    }
}

// Remove uma palavra-chave por ID
async function deletePalavraChave(req, res) {
    try {
        const { id } = req.params;
        const response = await PalavrasChaveService.deletePalavraChave(parseInt(id));
        res.status(204).send(response);
    } catch (error) {
        ErrorHandler.handleError(res, error);
    }
}

module.exports = {
    getAllPalavrasChave,
    createPalavraChave,
    getPalavraChaveById,
    updatePalavraChave,
    deletePalavraChave,
};