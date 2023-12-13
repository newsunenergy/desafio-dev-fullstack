import { Request, Response } from 'express';
import { Lead } from '../models/Lead';

class LeadController {
  private static leads: Lead[] = [];

  // Método para registrar uma nova simulação
  static registrarSimulacao(req: Request, res: Response) {
    const { nomeCompleto, email, telefone, unidades } = req.body;

    // Validar dados (adapte conforme necessário)
    if (!nomeCompleto || !email || !telefone || !unidades || unidades.length === 0) {
      return res.status(400).json({ error: 'Dados inválidos' });
    }

    // Criar nova simulação (renomeada de lead para simulacao)
    const novaSimulacao: Lead = {
      id: String(Date.now()),
      nomeCompleto,
      email,
      telefone,
      unidades,
    };

    // Adicionar ao array de leads (ou seria array de simulações?)
    LeadController.leads.push(novaSimulacao);

    // Renomeie a propriedade 'lead' para 'simulacao'
    const simulacao = { simulacao: novaSimulacao };

    return res.status(201).json(simulacao);
  }

  // Método para listar todas as simulações
  static listarSimulacoes(req: Request, res: Response) {
    return res.status(200).json(LeadController.leads);
  }

  // Método para listar uma simulação por ID
  static listarSimulacaoPorId(req: Request, res: Response) {
    const leadId = req.params.leadId;
    const lead = LeadController.leads.find((l) => l.id === leadId);

    if (!lead) {
      return res.status(404).json({ error: 'Simulação não encontrada' });
    }

    // Renomeie a propriedade 'lead' para 'simulacao'
    const simulacao = { simulacao: lead };

    return res.status(200).json(simulacao);
  }
}

export default LeadController;
