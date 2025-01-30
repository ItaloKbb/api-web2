const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class UserConhecimentoService {
    /**
     * Retorna uma lista de UserConhecimento com paginação.
     * @param {number} limit - Número de UserConhecimento por página.
     * @param {number} page - Página atual.
     * @param {Object} filters - Filtros opcionais (e.g., userId, conhecimentoId).
     */
    async getAllUserConhecimentos(limit = 10, page = 1, filters = {}) {
        const skip = (page - 1) * limit;

        try {
            const userConhecimentos = await prisma.userConhecimento.findMany({
                where: filters,
                skip,
                take: limit,
                include: {
                    user: true,
                    conhecimento: true,
                },
            });

            const total = await prisma.userConhecimento.count({ where: filters });

            return {
                data: userConhecimentos,
                total,
                page,
                totalPages: Math.ceil(total / limit),
            };
        } catch (error) {
            throw new Error(`Erro ao buscar UserConhecimentos: ${error.message}`);
        }
    }

    /**
     * Cria um novo UserConhecimento.
     * @param {Object} data - Dados do UserConhecimento.
     */
    async createUserConhecimento(data) {
        try {
            const userConhecimento = await prisma.userConhecimento.create({
                data,
            });
            return userConhecimento;
        } catch (error) {
            throw new Error(`Erro ao criar UserConhecimento: ${error.message}`);
        }
    }

    /**
     * Retorna um UserConhecimento por ID.
     * @param {number} id - ID do UserConhecimento.
     */
    async getUserConhecimentoById(id) {
        try {
            const userConhecimento = await prisma.userConhecimento.findUnique({
                where: { id },
                include: {
                    user: true,
                    conhecimento: true,
                },
            });
            return userConhecimento;
        } catch (error) {
            throw new Error(`Erro ao buscar UserConhecimento: ${error.message}`);
        }
    }

    /**
     * Atualiza um UserConhecimento por ID.
     * @param {number} id - ID do UserConhecimento.
     * @param {Object} data - Dados para atualização.
     */
    async updateUserConhecimento(id, data) {
        try {
            const userConhecimento = await prisma.userConhecimento.update({
                where: { id },
                data,
            });
            return userConhecimento;
        } catch (error) {
            throw new Error(`Erro ao atualizar UserConhecimento: ${error.message}`);
        }
    }

    /**
     * Remove um UserConhecimento por ID.
     * @param {number} id - ID do UserConhecimento.
     */
    async deleteUserConhecimento(id) {
        try {
            await prisma.userConhecimento.delete({
                where: { id },
            });
            return { message: 'UserConhecimento removido com sucesso' };
        } catch (error) {
            throw new Error(`Erro ao remover UserConhecimento: ${error.message}`);
        }
    }
}

module.exports = new UserConhecimentoService();