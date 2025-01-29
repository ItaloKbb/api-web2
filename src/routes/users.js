const express = require('express');
const userController = require('../controllers/userControllers');
const authenticateToken = require('../middleware/authMiddleware');
const router = express.Router();

// Post do login que retorna o TOKEN jwt para uso no client
router.post('/login', userController.login);
router.post('/token', authenticateToken, userController.validateToken);
router.post('/', authenticateToken, userController.createUser);

// Retorna um usuário específico ou todos eles
router.get('/:id?', userController.getUser);

// Atualiza um usuário de acordo com seu ID
router.put('/:id', authenticateToken, userController.updateUser);

module.exports = router;