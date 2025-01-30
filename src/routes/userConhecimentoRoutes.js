const express = require('express');
const Joi = require('joi');
const validate = require('../middleware/beanValidation');
const router = express.Router();
const UserConhecimentoController = require('../controllers/userConhecimentoController');
const authenticateToken = require('../middleware/authMiddleware');

// Esquema de validação para UserConhecimento
const UserConhecimentoSchema = Joi.object({
    userId: Joi.number().required(),
    conhecimentoId: Joi.number().required(),
    nivel: Joi.number().min(0).max(10).required(),
});

// Rotas de UserConhecimento com validação
router.get('/', UserConhecimentoController.getAllUserConhecimentos);
router.post('/', authenticateToken, validate(UserConhecimentoSchema), UserConhecimentoController.createUserConhecimento);
router.put('/:id', authenticateToken, validate(UserConhecimentoSchema), UserConhecimentoController.updateUserConhecimento);
router.delete('/:id', authenticateToken, UserConhecimentoController.deleteUserConhecimento);
router.get('/:id', UserConhecimentoController.getUserConhecimentoById);

module.exports = router;