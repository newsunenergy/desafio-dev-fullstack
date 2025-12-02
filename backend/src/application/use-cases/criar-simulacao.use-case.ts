import {
  Injectable,
  ConflictException,
  BadRequestException,
  Inject,
} from '@nestjs/common';
import type { ILeadRepository } from '../../domain/repositories/lead.repository.interface';
import { Lead } from '../../domain/entities/lead.entity';
import {
  Unidade,
  ModeloFasico,
  Enquadramento,
} from '../../domain/entities/unidade.entity';
import { Consumo } from '../../domain/entities/consumo.entity';
import { SolicitarSimulacaoInput } from '../dtos/solicitar-simulacao.dto';
import { MagicPdfService } from '../../infrastructure/external/magic-pdf.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CriarSimulacaoUseCase {
  constructor(
    @Inject('ILeadRepository') private leadRepository: ILeadRepository,
    private magicPdfService: MagicPdfService,
  ) {}

  async execute(
    input: SolicitarSimulacaoInput,
    arquivos: Express.Multer.File[],
  ): Promise<Lead> {
    // Verificar se o email já existe
    const leadExistente = await this.leadRepository.buscarPorEmail(input.email);
    if (leadExistente) {
      throw new ConflictException('Já existe um lead com este email');
    }

    // Decodificar todas as contas de energia
    const unidadesDecodificadas = await Promise.all(
      arquivos.map(async (arquivo) => {
        const dadosDecodificados =
          await this.magicPdfService.decodificarContaEnergia(arquivo);

        // Verificar se o código da unidade já existe
        const unidadeExistente =
          await this.leadRepository.buscarPorCodigoUnidade(
            dadosDecodificados.unit_key,
          );
        if (unidadeExistente) {
          throw new ConflictException(
            `Já existe uma unidade com o código ${dadosDecodificados.unit_key}`,
          );
        }

        // Validar que temos pelo menos 12 meses de histórico
        if (
          !dadosDecodificados.invoice ||
          dadosDecodificados.invoice.length < 12
        ) {
          throw new BadRequestException(
            `O histórico de consumo deve conter pelo menos 12 meses. Encontrado: ${dadosDecodificados.invoice?.length || 0} meses`,
          );
        }

        // Se tiver mais de 12 meses, pegar apenas os últimos 12 (mais recentes)
        // Ordenar por data (mais recente primeiro) e pegar os primeiros 12
        let invoiceProcessado = [...dadosDecodificados.invoice];
        if (invoiceProcessado.length > 12) {
          // Ordenar por data (mais recente primeiro)
          invoiceProcessado.sort((a, b) => {
            const dateA = new Date(a.consumo_date).getTime();
            const dateB = new Date(b.consumo_date).getTime();
            return dateB - dateA; // Ordem decrescente (mais recente primeiro)
          });
          // Pegar apenas os últimos 12 meses
          invoiceProcessado = invoiceProcessado.slice(0, 12);
          // Reordenar por data crescente (mais antigo primeiro) para manter ordem cronológica
          invoiceProcessado.sort((a, b) => {
            const dateA = new Date(a.consumo_date).getTime();
            const dateB = new Date(b.consumo_date).getTime();
            return dateA - dateB; // Ordem crescente (mais antigo primeiro)
          });
        }

        // Validar e converter tipos
        const modeloFasico = dadosDecodificados.phaseModel as ModeloFasico;
        const enquadramento = dadosDecodificados.chargingModel as Enquadramento;

        // Mapear dados decodificados para o domínio
        // invoice é um array de objetos, cada um com consumo_fp e consumo_date
        const consumos = invoiceProcessado.map(
          (item) =>
            new Consumo(uuidv4(), item.consumo_fp, new Date(item.consumo_date)),
        );

        return new Unidade(
          uuidv4(),
          dadosDecodificados.unit_key,
          modeloFasico,
          enquadramento,
          consumos,
        );
      }),
    );

    // Criar o lead
    const lead = new Lead(
      uuidv4(),
      input.nomeCompleto,
      input.email,
      input.telefone,
      unidadesDecodificadas,
    );

    return await this.leadRepository.criar(lead);
  }
}
