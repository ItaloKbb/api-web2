const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY || 'Chave_secreta_122';


const authenticateToken = (req, res, next) => {
  // Permitir rotas públicas GET sem validação
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    return res.sendStatus(401);
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;