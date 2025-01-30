const express = require('express');
const Joi = require('joi');
const validate = require('../middleware/beanValidation');
const router = express.Router();
const PalavrasChaveController = require('../controllers/palavrasChaveController');
const authenticateToken = require('../middleware/authMiddleware');

// Esquema de validação para palavra-chave
const PalavraChaveSchema = Joi.object({
    texto: Joi.string().min(3).max(100).required(),
});

// Rotas de palavras-chave com validação
router.get('/', PalavrasChaveController.getAllPalavrasChave);
router.post('/', authenticateToken, validate(PalavraChaveSchema), PalavrasChaveController.createPalavraChave);
router.put('/:id', authenticateToken, validate(PalavraChaveSchema), PalavrasChaveController.updatePalavraChave);
router.delete('/:id', authenticateToken, PalavrasChaveController.deletePalavraChave);
router.get('/:id', PalavrasChaveController.getPalavraChaveById);

module.exports = router;