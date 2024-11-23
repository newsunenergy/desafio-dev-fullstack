import { Injectable, BadRequestException } from '@nestjs/common';
import { Lead, Unidade } from '@prisma/client';
import axios from 'axios';
import {
  EnergyData,
  File,
  QueryListaSimulacoesDto,
  SimulationDTO,
} from './simulation.dto';
import { SimulationRepository } from './simulation.repository';

@Injectable()
export class SimulationService {
  constructor(private readonly simulationRepository: SimulationRepository) {}

  async criarSimulacao(data: SimulationDTO): Promise<Lead | Unidade | {}> {
    const { nomeCompleto, email, telefone, arquivo } = data;

    const unidade = await this.obterUnidadesDoArquivo(arquivo);

    return this.criarLead({ nomeCompleto, email, telefone, unidade });
  }

  private async obterUnidadesDoArquivo(file: File): Promise<EnergyData> {
    try {
      const formData = new FormData();

      const blob = new Blob([file.buffer], { type: file.fileType.mime });
      formData.append('file', blob, file.originalName);

      const response = await axios.post(
        'https://magic-pdf.solarium.newsun.energy/v1/magic-pdf',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      if (!response.data || response.data.error) {
        throw new BadRequestException('Erro ao consultar dados do arquivo.');
      }

      let { invoice } = response.data;

      if (invoice.length < 12) {
        const result = [];
        const now = new Date(invoice[0].consumo_date);
        let currentDate = new Date(now);

        for (let i = 0; i < 12; i++) {
          const existingInvoice = invoice.find((item) => {
            const itemDate = new Date(item.consumo_date);
            return (
              itemDate.getFullYear() === currentDate.getFullYear() &&
              itemDate.getMonth() === currentDate.getMonth()
            );
          });

          if (existingInvoice) {
            result.push(existingInvoice);
          } else {
            result.push({
              consumo_fp: 0,
              consumo_date: new Date(currentDate).toISOString(),
            });
          }

          currentDate.setMonth(currentDate.getMonth() - 1);
        }

        invoice = result;
      }

      response.data.invoice = invoice;

      return response.data;
    } catch (error) {
      throw new BadRequestException(
        'Erro ao processar o arquivo: ' + error.message,
      );
    }
  }

  private async criarLead(data): Promise<Lead | Unidade | {}> {
    const { nomeCompleto, email, telefone, unidade } = data;

    const leadExiste = await this.simulationRepository.findByEmail(email);

    const unidadeExiste = await this.simulationRepository.findByUnitKey(
      unidade.unit_key,
    );

    if (unidadeExiste && leadExiste) {
      if (unidadeExiste.leadId !== leadExiste.id) {
        return {
          success: false,
          message: 'Unidade ja pertence a outra pessoa',
        };
      }
      return await this.atualizarUnidadeSeNecessario(unidade);
    }

    if (leadExiste && !unidadeExiste) {
      const data = await this.simulationRepository.createUnitWithLeadExistent(
        leadExiste.id,
        unidade,
      );

      return { data, success: true, message: 'Simulação criada com sucesso' };
    }

    if (!leadExiste && !unidadeExiste) {
      const data = await this.simulationRepository.createLeadWithUnit(
        nomeCompleto,
        email,
        telefone,
        unidade,
      );

      return { data, success: true, message: 'Simulação criada com sucesso' };
    }

    if (unidadeExiste && !leadExiste) {
      return {
        success: false,
        message: 'Unidade já pertence a outra pessoa',
      };
    }
  }

  async listarLeads(query: QueryListaSimulacoesDto): Promise<Unidade[]> {
    return await this.simulationRepository.findLeads(query);
  }

  async buscarLeadPorId(id: string): Promise<Lead | null> {
    return this.simulationRepository.findById(id);
  }

  private async verificarNecessidadeDeAtualizacao(
    unidade: EnergyData,
  ): Promise<boolean> {
    const ultimoConsumoRegistrado =
      await this.simulationRepository.lastConsumptionRegistered(
        unidade.unit_key,
      );

    const primeiroConsumoInvoice = unidade.invoice[0];
    if (
      ultimoConsumoRegistrado &&
      new Date(ultimoConsumoRegistrado.mesDoConsumo).getTime() ===
        new Date(primeiroConsumoInvoice.consumo_date).getTime()
    ) {
      return false;
    }

    return true;
  }

  private async atualizarUnidadeSeNecessario(
    unidade: EnergyData,
  ): Promise<Unidade | {}> {
    const precisaAtualizar =
      await this.verificarNecessidadeDeAtualizacao(unidade);

    if (!precisaAtualizar) {
      return {
        success: true,
        message: 'Unidade já existe e está atualizada',
      };
    }

    const data =
      await this.simulationRepository.updateUnitWithConsumption(unidade);

    return {
      data,
      success: true,
      message: 'Unidade atualizada com sucesso',
    };
  }
}
