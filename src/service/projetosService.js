const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class ProjetosService {
    /**
     * Retorna uma lista de projetos com paginação.
     * @param {number} limit - Número de projetos por página.
     * @param {number} page - Página atual.
     * @param {Object} filters - Filtros opcionais (e.g., nome, palavras-chave).
     */
    async getAllProjetos(limit = 10, page = 1, filters = {}) {
        const skip = (page - 1) * limit;

        try {
            const projetos = await prisma.projeto.findMany({
                where: filters,
                skip,
                take: limit,
                include: {
                    users: true,
                    palavras_chave: true,
                    conhecimentos: true,
                },
            });

            const total = await prisma.projeto.count({ where: filters });

            return {
                data: projetos,
                total,
                page,
                totalPages: Math.ceil(total / limit),
            };
        } catch (error) {
            throw new Error(`Erro ao buscar projetos: ${error.message}`);
        }
    }

    /**
     * Cria um novo projeto.
     * @param {Object} data - Dados do projeto.
     */
    async createProjeto(data) {
        try {
            const projeto = await prisma.projeto.create({
                data: {
                    ...data,
                    palavras_chave: {
                        connect: data.palavras_chave.map(id => ({ id })),
                    },
                    users: {
                        connect: data.users.map(id => ({ id })),
                    },
                },
            });
            return projeto;
        } catch (error) {
            throw new Error(`Erro ao criar projeto: ${error.message}`);
        }
    }

    /**
     * Retorna um projeto por ID.
     * @param {number} id - ID do projeto.
     */
    async getProjetoById(id) {
        try {
            const projeto = await prisma.projeto.findUnique({
                where: { id },
                include: {
                    users: true,
                    palavras_chave: true,
                    conhecimentos: true,
                },
            });
            return projeto;
        } catch (error) {
            throw new Error(`Erro ao buscar projeto: ${error.message}`);
        }
    }

    /**
     * Atualiza um projeto por ID.
     * @param {number} id - ID do projeto.
     * @param {Object} data - Dados para atualização.
     */
    async updateProjeto(id, data) {
        try {
            const projeto = await prisma.projeto.update({
                where: { id },
                data: {
                    ...data,
                    palavras_chave: {
                        set: data.palavras_chave.map(id => ({ id })),
                    },
                    users: {
                        set: data.users.map(id => ({ id })),
                    },
                },
            });
            return projeto;
        } catch (error) {
            throw new Error(`Erro ao atualizar projeto: ${error.message}`);
        }
    }

    /**
     * Remove um projeto por ID.
     * @param {number} id - ID do projeto.
     */
    async deleteProjeto(id) {
        try {
            await prisma.projeto.delete({
                where: { id },
            });
            return { message: 'Projeto removido com sucesso' };
        } catch (error) {
            throw new Error(`Erro ao remover projeto: ${error.message}`);
        }
    }
}

module.exports = new ProjetosService();