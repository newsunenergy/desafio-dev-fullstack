import { z } from 'zod';

export const FiltrosSimulacaoSchema = z.object({
  nome: z.string().optional(),
  email: z.string().email().optional().or(z.literal('')),
  codigoUnidade: z.string().optional(),
});

export type FiltrosSimulacaoInput = z.infer<typeof FiltrosSimulacaoSchema>;
