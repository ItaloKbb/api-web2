const express = require('express');
const Joi = require('joi');
const validate = require('../middleware/beanValidation');
const authenticateToken = require('../middleware/authMiddleware');
const UserController = require('../controllers/userControllers');

const router = express.Router();

// Esquema de validação para usuário
const userSchema = Joi.object({
    nome: Joi.string().min(3).max(100).required().messages({
        'string.min': 'O nome deve ter no mínimo 3 caracteres.',
        'string.max': 'O nome deve ter no máximo 100 caracteres.',
        'any.required': 'O campo nome é obrigatório.'
    }),
    email: Joi.string().email().required().messages({
        'string.email': 'O e-mail deve ser válido.',
        'any.required': 'O campo e-mail é obrigatório.'
    }),
    senha: Joi.string().min(6).required().messages({
        'string.min': 'A senha deve ter no mínimo 6 caracteres.',
        'any.required': 'O campo senha é obrigatório.'
    }),
    emprego: Joi.string().min(3).max(100).required().messages({
        'string.min': 'O emprego deve ter no mínimo 3 caracteres.',
        'string.max': 'O emprego deve ter no máximo 100 caracteres.',
        'any.required': 'O campo emprego é obrigatório.'
    }),
    area: Joi.string().min(3).max(100).required().messages({
        'string.min': 'A área deve ter no mínimo 3 caracteres.',
        'string.max': 'A área deve ter no máximo 100 caracteres.',
        'any.required': 'O campo área é obrigatório.'
    }),
    nacionalidade: Joi.string().min(3).max(50).required().messages({
        'string.min': 'A nacionalidade deve ter no mínimo 3 caracteres.',
        'string.max': 'A nacionalidade deve ter no máximo 50 caracteres.',
        'any.required': 'O campo nacionalidade é obrigatório.'
    }),
    bio: Joi.string().min(3).max(150).messages({
        'string.min': 'A biografia deve ter no mínimo 3 caracteres.',
        'string.max': 'A biografia deve ter no máximo 150 caracteres.'
    })
});

// Rotas de autenticação
router.post('/login', UserController.login);
router.post('/token', UserController.validateToken);

// Rotas de usuários
router.post('/', authenticateToken, validate(userSchema), UserController.createUser);
router.get('/:id?', UserController.getUser);
router.put('/:id', authenticateToken, validate(userSchema), UserController.updateUser);

module.exports = router;