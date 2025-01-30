const express = require('express');
const Joi = require('joi');
const validate = require('../middleware/beanValidation');
const router = express.Router();
const ProjetosController = require('../controllers/projetoController');
const authenticateToken = require('../middleware/authMiddleware');

// Esquema de validação para projeto
const ProjetoSchema = Joi.object({
    nome: Joi.string().min(3).max(100).required(),
    resumo: Joi.string().min(10).max(500).required(),
    link_externo: Joi.string().uri().required(),
    palavras_chave: Joi.array().items(Joi.number()).required(),
    users: Joi.array().items(Joi.number()).required(),
});

// Rotas de projetos com validação
router.get('/', ProjetosController.getAllProjetos);
router.post('/', authenticateToken, validate(ProjetoSchema), ProjetosController.createProjeto);
router.put('/:id', authenticateToken, validate(ProjetoSchema), ProjetosController.updateProjeto);
router.delete('/:id', authenticateToken, ProjetosController.deleteProjeto);
router.get('/:id', ProjetosController.getProjetoById);

module.exports = router;