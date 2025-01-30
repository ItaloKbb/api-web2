const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class PalavrasChaveService {
    /**
     * Retorna uma lista de palavras-chave com paginação.
     * @param {number} limit - Número de palavras-chave por página.
     * @param {number} page - Página atual.
     * @param {Object} filters - Filtros opcionais (e.g., texto).
     */
    async getAllPalavrasChave(limit = 10, page = 1, filters = {}) {
        const skip = (page - 1) * limit;

        try {
            const palavrasChave = await prisma.palavra_Chave.findMany({
                where: filters,
                skip,
                take: limit,
            });

            const total = await prisma.palavra_Chave.count({ where: filters });

            return {
                data: palavrasChave,
                total,
                page,
                totalPages: Math.ceil(total / limit),
            };
        } catch (error) {
            throw new Error(`Erro ao buscar palavras-chave: ${error.message}`);
        }
    }

    /**
     * Cria uma nova palavra-chave.
     * @param {Object} data - Dados da palavra-chave.
     */
    async createPalavraChave(data) {
        try {
            const palavraChave = await prisma.palavra_Chave.create({
                data,
            });
            return palavraChave;
        } catch (error) {
            throw new Error(`Erro ao criar palavra-chave: ${error.message}`);
        }
    }

    /**
     * Retorna uma palavra-chave por ID.
     * @param {number} id - ID da palavra-chave.
     */
    async getPalavraChaveById(id) {
        try {
            const palavraChave = await prisma.palavra_Chave.findUnique({
                where: { id },
            });
            return palavraChave;
        } catch (error) {
            throw new Error(`Erro ao buscar palavra-chave: ${error.message}`);
        }
    }

    /**
     * Atualiza uma palavra-chave por ID.
     * @param {number} id - ID da palavra-chave.
     * @param {Object} data - Dados para atualização.
     */
    async updatePalavraChave(id, data) {
        try {
            const palavraChave = await prisma.palavra_Chave.update({
                where: { id },
                data,
            });
            return palavraChave;
        } catch (error) {
            throw new Error(`Erro ao atualizar palavra-chave: ${error.message}`);
        }
    }

    /**
     * Remove uma palavra-chave por ID.
     * @param {number} id - ID da palavra-chave.
     */
    async deletePalavraChave(id) {
        try {
            await prisma.palavra_Chave.delete({
                where: { id },
            });
            return { message: 'Palavra-chave removida com sucesso' };
        } catch (error) {
            throw new Error(`Erro ao remover palavra-chave: ${error.message}`);
        }
    }
}

module.exports = new PalavrasChaveService();