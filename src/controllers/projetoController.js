const ProjetosService = require('../service/projetosService');
const ErrorHandler = require('../lib/ErrorHandler');

// Retorna Projetos com paginação
async function getAllProjetos(req, res) {
    try {
        const { limit = 10, page = 1, nome } = req.query;

        const filters = {};
        if (nome) filters.nome = { contains: nome, mode: 'insensitive' };

        const response = await ProjetosService.getAllProjetos(parseInt(limit), parseInt(page), filters);
        res.status(200).json(response);
    } catch (error) {
        ErrorHandler.handleError(res, error);
    }
}

// Cria um novo projeto
async function createProjeto(req, res) {
    try {
        const projeto = await ProjetosService.createProjeto(req.body);
        res.status(201).json(projeto);
    } catch (error) {
        ErrorHandler.handleError(res, error);
    }
}

// Retorna um projeto por ID
async function getProjetoById(req, res) {
    try {
        const { id } = req.params;
        const projeto = await ProjetosService.getProjetoById(parseInt(id));
        if (!projeto) {
            return res.status(404).json({ error: "Projeto não encontrado" });
        }
        res.status(200).json(projeto);
    } catch (error) {
        ErrorHandler.handleError(res, error);
    }
}

// Atualiza um projeto por ID
async function updateProjeto(req, res) {
    try {
        const { id } = req.params;
        const projeto = await ProjetosService.updateProjeto(parseInt(id), req.body);
        res.status(200).json(projeto);
    } catch (error) {
        ErrorHandler.handleError(res, error);
    }
}

// Remove um projeto por ID
async function deleteProjeto(req, res) {
    try {
        const { id } = req.params;
        const response = await ProjetosService.deleteProjeto(parseInt(id));
        res.status(204).send(response);
    } catch (error) {
        ErrorHandler.handleError(res, error);
    }
}

module.exports = {
    getAllProjetos,
    createProjeto,
    getProjetoById,
    updateProjeto,
    deleteProjeto,
};