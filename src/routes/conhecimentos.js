const express = require('express');
const Joi = require('joi');
const validate = require('../middleware/beanValidation');
const router = express.Router();
const ConhecimentoController = require('../controllers/conhecimentoController');
const authenticateToken = require('../middleware/authMiddleware');

// Esquema de validação para conhecimento
const ConhecimentoSchema = Joi.object({
    titulo: Joi.string().min(3).max(100).required().messages({
        'string.min': 'O título deve ter no mínimo 3 caracteres.',
        'string.max': 'O título deve ter no máximo 100 caracteres.',
        'any.required': 'O campo título é obrigatório.'
    })
});

// Rotas de conhecimentos com validação
router.get('/', ConhecimentoController.getAllConhecimentos);
router.post('/', authenticateToken, validate(ConhecimentoSchema), ConhecimentoController.createConhecimento);
router.put('/:id', authenticateToken, validate(ConhecimentoSchema), ConhecimentoController.updateConhecimento);
router.delete('/:id', authenticateToken, ConhecimentoController.deleteConhecimento);
router.get('/:id', ConhecimentoController.getConhecimentoById);

module.exports = router;