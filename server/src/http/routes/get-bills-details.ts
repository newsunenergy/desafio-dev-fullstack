import { z } from 'zod'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { getBillsDetails } from '../../functions/get-bills-details'

export const getBillsDetailsRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/bills/:leadId',
    {
      schema: {
        params: z.object({
          leadId: z.string(),
        }),
      },
    },
    async (request, reply) => {
      try {
        const { leadId } = request.params

        const billDetails = await getBillsDetails({ leadId })

        reply.send({ billDetails })
      } catch (error) {
        console.error('Erro ao obter os detalhes da conta:', error)
        reply.status(500).send({ error: 'Erro ao obter os detalhes da conta' })
      }
    }
  )
}
