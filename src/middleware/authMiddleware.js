const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY || '#$%123@2024';
const UserService = require('../service/userService');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader.split(' ')[1];

  if (token == null) {
    return res.sendStatus(401);
  }

  decoded = UserService.validateToken(token);

  if(decoded){
    next();
  }else{
    return res.sendStatus(403);
  }
};

module.exports = authenticateToken;