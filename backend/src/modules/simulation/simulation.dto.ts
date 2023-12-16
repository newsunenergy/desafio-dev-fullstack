export class OutputCreateSimulationDto {
  message: string[] | string;
  error?: string;
}

export const validSortingFields = [
  'lead.nomeCompleto',
  'lead.email',
  'codigoDaUnidadeConsumidora',
  'enquadramento',
  'modeloFasico',
  'consumoEmReais',
];
