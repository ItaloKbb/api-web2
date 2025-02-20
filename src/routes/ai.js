const express = require('express');
const Joi = require('joi');
const validate = require('../middleware/beanValidation');
const router = express.Router();
const DeepseekController = require('../controllers/deepseek');
const authenticateToken = require('../middleware/authMiddleware');

// Esquema de validação para conhecimento
const RequestSchema = Joi.object({
    content: Joi.string().min(3).max(200).required().messages({
        'string.min': 'O conteudo deve ter no mínimo 3 caracteres.',
        'string.max': 'O conteudo deve ter no máximo 200 caracteres.',
        'any.required': 'O campo content é obrigatório.'
    })
});

router.get('/', authenticateToken, validate(RequestSchema), DeepseekController.getAiResponse);

module.exports = router;