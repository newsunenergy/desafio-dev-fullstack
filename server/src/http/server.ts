import fastify from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import fastifyCors from '@fastify/cors'
import fastifyMultipart from '@fastify/multipart'

import { registerSimulationRoute } from './routes/register-simulation'
import { getSimulationsRoute } from './routes/get-simulations'
import { getBillsDetailsRoute } from './routes/get-bills-details'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, {
  origin: '*',
})

app.register(fastifyMultipart)

// Add schema validator and serializer
app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(registerSimulationRoute)
app.register(getSimulationsRoute)
app.register(getBillsDetailsRoute)

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('HTTP server running!')
  })
