import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface SolicitarSimulacaoInput {
  nomeCompleto: string;
  email: string;
  telefone: string;
  informacoesDaFatura: {
    codigoDaUnidadeConsumidora: string;
    modeloFasico: 'monofasico' | 'bifasico' | 'trifasico';
    enquadramento: 'AX' | 'B1' | 'B2' | 'B3';
    mesDeReferencia: string;
    consumoEmReais: number;
    historicoDeConsumoEmKWH: {
      consumoForaPontaEmKWH: number;
      mesDoConsumo: string;
    }[];
  }[];
}

export interface Lead {
  id: string;
  nomeCompleto: string;
  email: string;
  telefone: string;
  unidades: {
    id: string;
    codigoDaUnidadeConsumidora: string;
    modeloFasico: string;
    enquadramento: string;
    historicoDeConsumoEmKWH: {
      consumoForaPontaEmKWH: number;
      mesDoConsumo: string;
    }[];
  }[];
}

export const simulacaoApi = {
  criar: async (
    nomeCompleto: string,
    email: string,
    telefone: string,
    arquivos: File[],
  ): Promise<Lead> => {
    const formData = new FormData();

    // Adicionar dados do formulário
    formData.append('nomeCompleto', nomeCompleto);
    formData.append('email', email);
    formData.append('telefone', telefone);

    // Adicionar arquivos
    arquivos.forEach((arquivo) => {
      formData.append('arquivos', arquivo);
    });

    const response = await api.post<Lead>('/simulacoes', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  },

  listar: async (filtros?: {
    nome?: string;
    email?: string;
    codigoUnidade?: string;
  }): Promise<Lead[]> => {
    const response = await api.get<Lead[]>('/simulacoes', {
      params: filtros,
    });
    return response.data;
  },

  buscarPorId: async (id: string): Promise<Lead> => {
    const response = await api.get<Lead>(`/simulacoes/${id}`);
    return response.data;
  },
};

