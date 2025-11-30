import { z } from 'zod';

export const InformacaoDaFaturaSchema = z.object({
  codigoDaUnidadeConsumidora: z
    .string()
    .min(1, 'Código da unidade consumidora é obrigatório'),
  modeloFasico: z.enum(['monofasico', 'bifasico', 'trifasico'], {
    message: 'Modelo fasico deve ser monofasico, bifasico ou trifasico',
  }),
  enquadramento: z.enum(['AX', 'B1', 'B2', 'B3'], {
    message: 'Enquadramento deve ser AX, B1, B2 ou B3',
  }),
  mesDeReferencia: z.coerce.date({
    message: 'Mês de referência deve ser uma data válida',
  }),
  consumoEmReais: z
    .number()
    .positive('Consumo em reais deve ser um valor positivo'),
  historicoDeConsumoEmKWH: z
    .array(
      z.object({
        consumoForaPontaEmKWH: z
          .number()
          .nonnegative('Consumo fora de ponta deve ser um valor não negativo'),
        mesDoConsumo: z.coerce.date({
          message: 'Mês do consumo deve ser uma data válida',
        }),
      }),
    )
    .length(12, 'O histórico deve conter exatamente 12 meses de consumo'),
});

export const SolicitarSimulacaoSchema = z.object({
  nomeCompleto: z.string().min(1, 'Nome completo é obrigatório'),
  email: z.string().email('Email deve ser um endereço de email válido'),
  telefone: z.string().min(1, 'Telefone é obrigatório'),
  informacoesDaFatura: z
    .array(InformacaoDaFaturaSchema)
    .min(1, 'Deve haver pelo menos uma unidade consumidora'),
});

export type SolicitarSimulacaoInput = z.infer<typeof SolicitarSimulacaoSchema>;
export type InformacaoDaFatura = z.infer<typeof InformacaoDaFaturaSchema>;
