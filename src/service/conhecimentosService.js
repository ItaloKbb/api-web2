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
                    user: true,
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
                    user: true,
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
            const conhecimentoExistente = await prisma.conhecimento.findUnique({
                where: { id: parseInt(id) },
            });
    
            if (!conhecimentoExistente) {
                return {
                    error: {
                        message: 'Conhecimento não encontrado.',
                        code: 'NOT_FOUND',
                        details: null
                    }
                };
            }
    
            // Verifica se o conhecimento tem dependências (exemplo: referências em outra tabela)
            const dependencias = await prisma.algumaTabelaRelacionada.findMany({
                where: { conhecimentoId: parseInt(id) }
            });
    
            if (dependencias.length > 0) {
                return {
                    error: {
                        message: 'Não é possível excluir o conhecimento pois ele está sendo referenciado em outros registros.',
                        code: 'CONFLICT',
                        details: `Quantidade de referências: ${dependencias.length}`
                    }
                };
            }
    
            await prisma.conhecimento.delete({
                where: { id: parseInt(id) },
            });
    
            return { message: 'Conhecimento removido com sucesso.' };
    
        } catch (error) {
            return {
                error: {
                    message: 'Erro ao remover conhecimento',
                    code: 'INTERNAL_SERVER_ERROR',
                    details: error.message
                }
            };
        }
    }
    
}

module.exports = new ConhecimentosService();