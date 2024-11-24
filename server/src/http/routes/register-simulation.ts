import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { registerSimulation } from '../../functions/register-simulation'

interface SimulationFormData {
  name: string
  email: string
  telefone: string
  bills: Buffer[]
}

export const registerSimulationRoute: FastifyPluginAsyncZod = async app => {
  app.post('/simulation', async (request, reply) => {
    try {
      const parts = request.parts()
      const formData: Partial<SimulationFormData> = {}
      formData.bills = []

      for await (const part of parts) {
        if ('file' in part) {
          const buffer = await part.toBuffer()
          formData.bills?.push(buffer)
        } else {
          const key = part.fieldname as keyof SimulationFormData
          formData[key] = part.value
        }
      }

      // Inferindo como String, pois usei o zod no frontend para validar.
      const result = await registerSimulation({
        name: formData.name as string,
        email: formData.email as string,
        telefone: formData.telefone as string,
        bills: formData.bills as Buffer[],
      })

      reply.status(200).send({ message: 'Simulação salva com sucesso!' })
    } catch (error) {
      console.error('Erro ao processar a requisição:', error)

      let errorMessage = 'Erro ao salvar simulação. Tente novamente.'
      if (error instanceof Error) {
        errorMessage = error.message
      }

      reply.status(500).send({
        error: errorMessage,
      })
    }
  })
}
