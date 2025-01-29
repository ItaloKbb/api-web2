const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class ConhecimentosService {
    /**
     * Retorna uma lista de conhecimentos com paginação.
     * @param {number} limit - Número de conhecimentos por página.
     * @param {number} page - Página atual.
     * @param {Object} filters - Filtros opcionais (e.g., título, jogador).
     */
    async getAllConhecimentos(limit = 10, page = 1, filters = {}) {
        const skip = (page - 1) * limit;

        try {
            const conhecimentos = await prisma.conhecimento.findMany({
                where: filters,
                skip,
                take: limit,
                include: {
                    projetos: false,
                },
            });

            const total = await prisma.conhecimento.count({ where: filters });

            return {
                data: conhecimentos,
                total,
                page,
                totalPages: Math.ceil(total / limit),
            };
        } catch (error) {
            throw new Error(`Erro ao buscar conhecimentos: ${error.message}`);
        }
    }

    /**
     * Cria uma novo conhecimento.
     * @param {Object} data - Dados da conhecimento.
     */
    async createConhecimento(data) {
        try {
            const conhecimento = await prisma.conhecimento.create({
                data,
            });
            return conhecimento;
        } catch (error) {
            throw new Error(`Erro ao criar conhecimento: ${error.message}`);
        }
    }

    /**
 * Retorna um conhecimento por ID.
 * @param {number} id - ID do conhecimento.
 */
    async getConhecimentoById(id) {
        try {
            const conhecimento = await prisma.conhecimento.findUnique({
                where: { id },
                include: {
                    projetos: false,
                },
            });
            return conhecimento;
        } catch (error) {
            throw new Error(`Erro ao buscar projetos: ${error.message}`);
        }
    }

    /**
     * Atualiza um conhecimento por ID.
     * @param {number} id - ID do conhecimento.
     * @param {Object} data - Dados para atualização.
     */
    async updateConhecimento(id, data) {
        try {
            const conhecimento = await prisma.conhecimento.update({
                where: { id },
                data,
            });
            return conhecimento;
        } catch (error) {
            throw new Error(`Erro ao atualizar conhecimento: ${error.message}`);
        }
    }

    /**
     * Remove um conhecimento por ID.
     * @param {number} id - ID do conhecimento.
     */
    async deleteConhecimento(id) {
        try {
            await prisma.conhecimento.delete({
                where: { id },
            });
            return { message: 'conhecimento removido com sucesso' };
        } catch (error) {
            throw new Error(`Erro ao remover conhecimento: ${error.message}`);
        }
    }
}

module.exports = new ConhecimentosService();