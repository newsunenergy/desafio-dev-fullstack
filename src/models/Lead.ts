export interface Unidade {
    id: string;
    codigoDaUnidadeConsumidora: string;
    modeloFasico: 'monofasico' | 'bifasico' | 'trifasico';
    enquadramento: 'AX' | 'B1' | 'B2' | 'B3';
    historicoDeConsumoEmKWH: Consumo[];
  }
  
  export interface Consumo {
    consumoForaPontaEmKWH: number;
    mesDoConsumo: string;
  }
  
  export interface Lead {
    id: string;
    nomeCompleto: string;
    email: string;
    telefone: string;
    unidades: Unidade[];
  }
  