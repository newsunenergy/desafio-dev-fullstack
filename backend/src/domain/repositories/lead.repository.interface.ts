import { Lead } from '../entities/lead.entity';

export interface FiltrosSimulacao {
  nome?: string;
  email?: string;
  codigoUnidade?: string;
}

export interface ILeadRepository {
  criar(lead: Lead): Promise<Lead>;
  buscarPorId(id: string): Promise<Lead | null>;
  listar(filtros?: FiltrosSimulacao): Promise<Lead[]>;
  buscarPorEmail(email: string): Promise<Lead | null>;
  buscarPorCodigoUnidade(codigo: string): Promise<Lead | null>;
}
