'use server'

import { z } from 'zod'

import { registerSimulation } from '@/http/register-simulation'

const MAX_FILE_SIZE = 5 * 1024 * 1024
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'application/pdf',
]
const cleanPhoneNumber = (value: string) => value.replace(/\D/g, '')

const simulationSchema = z.object({
  name: z.string().refine(value => value.split(' ').length > 1, {
    message: 'Por favor, digite seu nome completo (Nome e sobrenome)',
  }),
  email: z
    .string()
    .email({ message: 'Por favor, forneça um endereço de e-mail válido.' }),
  telefone: z.string().refine(value => cleanPhoneNumber(value).length >= 11, {
    message:
      'O número de telefone deve ter 11 caracteres, incluindo o DDD (2 dígitos).',
  }),
  bills: z
    .array(z.any())
    .nonempty({ message: 'Você deve fazer upload de pelo menos um arquivo.' })
    .refine(files => files.every(file => file.size <= MAX_FILE_SIZE), {
      message: 'Cada arquivo deve ter no máximo 5MB.',
    })
    .refine(
      files => files.every(file => ACCEPTED_IMAGE_TYPES.includes(file.type)),
      {
        message:
          'Envie pelo menos um arquivo nos formatos PDF, JPG, JPEG, PNG ou WEBP.',
      }
    ),
})

export async function createSimulationAction(data: FormData) {
  //No servidor, não há FileList, é uma api do browser, por isso o unknown e any no bills.
  //@see: https://github.com/orgs/react-hook-form/discussions/11096
  //@see: https://github.com/vercel/next.js/discussions/59691
  interface FormDataObj {
    bills?: unknown[]
    [key: string]: unknown
  }

  const formDataObj: FormDataObj = {}

  for (const [key, value] of data.entries()) {
    if (key === 'bills') {
      formDataObj[key] = formDataObj[key] || []
      formDataObj[key].push(value)
    } else {
      formDataObj[key] = value
    }
  }

  const result = simulationSchema.safeParse(formDataObj)

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors
    return { success: false, message: null, errors }
  }

  const { name, email, telefone, bills } = result.data

  try {
    await registerSimulation({ name, email, telefone, bills })
  } catch (err) {
    console.error('Erro ao processar a simulação:', err)

    let message = 'Erro inesperado, tente novamente em alguns minutos'
    if (err instanceof Error && err.message) {
      message = err.message
    }

    return {
      success: false,
      message,
      errors: null,
    }
  }

  return { success: true, message: null, errors: null }
}
