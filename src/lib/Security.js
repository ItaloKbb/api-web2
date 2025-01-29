const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY || 'your_secret_key';

function validatePermissionsAdmin(req) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        throw new Error('Token não fornecido. Faça login para continuar.');
    }

    if (onlyAdmin) {
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, SECRET_KEY);

        if (decoded.role !== 'ADMIN') {
            throw new Error('Acesso negado. Somente administradores podem realizar essa operação.');
        }

        return true;
    }
    return false;
}

function validateUserPermissions(req, res, onlyPersonal = true) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        console.log(authHeader);
        throw new Error(`Token não fornecido. Não foi fornecido um header authorization.`);
    } 

    const token = authHeader.split(' ')[1];

    if (!token) {
        console.log(token);
        throw new Error(`Token não fornecido. Faça login para continuar.`);
    }

    const decoded = jwt.verify(token, SECRET_KEY);
    
    if (onlyPersonal) {
        if (!decoded.userId) {
            throw new Error('Acesso negado. Somente usuarios existentes podem alterar registros.');
        }
        return decoded.userId;
    }

    return true;
}

module.exports = {
    validatePermissionsAdmin,
    validateUserPermissions,
};