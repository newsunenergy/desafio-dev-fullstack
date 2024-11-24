import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { getSimulations } from '../../functions/get-simulations'
import { z } from 'zod'

const filtersSchema = z.object({
  nome: z.string().optional(),
  email: z.string().optional(),
  codigoDaUnidadeConsumidora: z.string().optional(),
})

export const getSimulationsRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/listagem',
    {
      schema: {
        querystring: filtersSchema,
      },
    },
    async request => {
      try {
        const filters = request.query
        const { simulations } = await getSimulations(filters)

        return { simulations }
      } catch (error) {
        console.error('Erro ao obter as simulações:', error)
        return { simulations: [] }
      }
    }
  )
}
