const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY || '#$%123@2024';

const prisma = new PrismaClient();

class UserService {
    /**
     * Cria um novo usuário.
     * @param {Object} userData - Dados do usuário.
     */
    async createUser(userData) {
        try {
            const { email, nome, bio, role, senha, emprego, area, nacionalidade } = userData;
            if (!senha) throw new Error('Senha é obrigatória');

            const senhaSecreta = await bcrypt.hash(senha, 10);
            return await prisma.user.create({
                data: { email, nome, bio, role, emprego, area, nacionalidade, senha: senhaSecreta }
            });
        } catch (error) {
            throw new Error(`Erro ao criar usuário: ${error.message}`);
        }
    }

    /**
     * Retorna uma lista de usuários com paginação e filtros.
     * @param {Object} filters - Filtros opcionais (id, nome, email).
     * @param {number} limit - Número de usuários por página.
     * @param {number} page - Página atual.
     */
    async getUsers(filters = {}, limit = 10, page = 1) {
        try {
            const skip = (page - 1) * limit;
            const where = {};
    
            if (filters.id) where.id = parseInt(filters.id);
            if (filters.nome) where.nome = { contains: filters.nome, mode: 'insensitive' };
            if (filters.email) where.email = { contains: filters.email, mode: 'insensitive' };
    
            const users = await prisma.user.findMany({
                where,
                skip,
                take: limit,
                include: {
                    conhecimentos: {
                        select: {
                            nivel: true,
                            conhecimento: {
                                select: { titulo: true }
                            }
                        }
                    },
                    projetos: true,
                }
            });
    
            // Ajusta a estrutura para incluir título e nível dos conhecimentos
            const formattedUsers = users.map(user => ({
                ...user,
                conhecimentos: user.conhecimentos.map(uc => ({
                    titulo: uc.conhecimento.titulo,
                    nivel: uc.nivel
                }))
            }));
    
            const total = await prisma.user.count({ where });
            return { data: formattedUsers, total, page, totalPages: Math.ceil(total / limit) };
        } catch (error) {
            throw new Error(`Erro ao buscar usuários: ${error.message}`);
        }
    }    

    /**
     * Atualiza um usuário por ID.
     * @param {number} id - ID do usuário.
     * @param {Object} userData - Dados para atualização.
     * @param {string} token - Token JWT para validação de permissão.
     */
    async updateUser(id, userData, token) {
        try {
            if (!id) throw new Error('User ID é necessário');

            const decoded = jwt.verify(token, SECRET_KEY);
            if (decoded.role !== 'ADMIN') {
                throw new Error('Acesso negado. Somente administradores podem atualizar usuários.');
            }

            if (userData.senha) {
                userData.senha = await bcrypt.hash(userData.senha, 10);
            }

            return await prisma.user.update({
                where: { id: parseInt(id) },
                data: userData,
            });
        } catch (error) {
            throw new Error(`Erro ao atualizar usuário: ${error.message}`);
        }
    }

    /**
     * Autentica um usuário e gera um token JWT.
     * @param {string} email - Email do usuário.
     * @param {string} senha - Senha do usuário.
     */
    async login(email, senha) {
        try {
            if (!email || !senha) throw new Error('Email e senha são obrigatórios.');

            const user = await prisma.user.findUnique({ where: { email } });
            if (!user) throw new Error('Não existe nenhuma conta com esse email!');

            const senhaValida = await bcrypt.compare(senha, user.senha);
            if (!senhaValida) throw new Error('Senha incorreta!');

            const tokenPayload = { userId: user.id, email: user.email, role: user.role };
            const token = jwt.sign(tokenPayload, SECRET_KEY, { expiresIn: '10h' });

            return { token, userId: user.id };
        } catch (error) {
            throw new Error(`Erro no login: ${error.message}`);
        }
    }

    /**
     * Valida um token JWT.
     * @param {string} token - Token JWT.
     */
    validateToken(token) {
        try {
            if (!token) throw new Error('Token não fornecido');
            return jwt.verify(token, SECRET_KEY);
        } catch (error) {
            throw new Error(`Token inválido: ${error.message}`);
        }
    }
}

module.exports = new UserService();