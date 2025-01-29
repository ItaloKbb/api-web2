const userService = require('../service/userService');

const createUser = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];
    const decoded = userService.validateToken(token);

    if(decoded.role === "ADMIN"){
      const user = await userService.createUser(req.body);
      res.json(user);
    }else{
      res.status(401).json({ error: "Usuario sem permissão" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const users = await userService.getUser(req.query);
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: 'Token não fornecido' });
    }
    const token = authHeader.split(' ')[1];

    const user = await userService.updateUser(req.params.id || req.query.id, req.body, token);
    res.json(user);
  } catch (error) {
    res.status(403).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { token, userId } = await userService.login(req.body.email, req.body.senha);
    res.json({ token, userId });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

const validateToken = (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ valid: false, error: 'Token não fornecido' });
    }
    const token = authHeader.split(' ')[1];

    const decoded = userService.validateToken(token);
    res.json({ valid: true, decoded });
  } catch (error) {
    res.status(401).json({ valid: false, error: error.message });
  }
};

module.exports = { createUser, getUser, updateUser, login, validateToken };