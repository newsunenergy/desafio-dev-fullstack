import { z } from 'zod';

const isFile = (file: any) =>
  file && file.fileType && file.fileType.mime.startsWith('application/');

const fileValidationSchema = z
  .object({
    originalName: z.string(),
    encoding: z.string(),
    busBoyMimeType: z.string(),
    buffer: z.instanceof(Buffer),
    size: z.number(),
    fileType: z.object({
      ext: z.string(),
      mime: z.string(),
    }),
  })
  .refine(isFile, {
    message: 'Input is not a valid file of type application/*',
  });

export const SimulationSchema = z
  .object({
    nomeCompleto: z
      .string({
        required_error: 'Nome completo é obrigatório',
      })
      .min(8, { message: 'Nome inválido' }),
    email: z
      .string({
        required_error: 'E-mail é obrigatório',
      })
      .email({ message: 'E-mail inválido' }),
    telefone: z
      .string({
        required_error: 'Telefone é obrigatório',
      })
      .min(10, { message: 'Telefone inválido' }),
    arquivo: fileValidationSchema,
  })
  .strict();
