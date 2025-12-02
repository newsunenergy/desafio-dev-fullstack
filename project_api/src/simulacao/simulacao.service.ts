import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSimulacaoDto } from './dto/create-simulacao.dto';
import { SimulacaoRepository } from './simulacao.repository';
import { processarContaPdf } from 'src/utils';
import { UnidadeDto } from './dto/unidade.dto';
import { ConsumoDto } from './dto/consumo.dto';

@Injectable()
export class SimulacaoService {
  constructor(private readonly simulacaoRepository: SimulacaoRepository) {}

  async create(
    createSimulacaoDto: CreateSimulacaoDto,
    files: Express.Multer.File[],
  ) {
    try {
      for (const file of files) {
        const dadosConta = await processarContaPdf(file.buffer);

        if (!dadosConta) {
          throw new BadRequestException(
            `Erro ao processar PDF ${file.filename}`,
          );
        }

        const { valor, unit_key, chargingModel, phaseModel, invoice } =
          dadosConta;

        if (invoice.length !== 12) {
          throw new BadRequestException(
            'A quantidade de meses de consumo deve ser igual a 12',
          );
        }

        const historicoDeConsumo: ConsumoDto[] = invoice.map((item) => ({
          consumoForaPontaEmKWH: item.consumo_fp,
          mesDoConsumo: new Date(item.consumo_date),
        }));
        const unidade = {
          codigoDaUnidadeConsumidora: unit_key,
          modeloFasico: phaseModel,
          enquadramento: chargingModel,
          valor: valor,
        } as UnidadeDto;

        await this.simulacaoRepository.create(
          createSimulacaoDto,
          unidade,
          historicoDeConsumo,
        );
      }
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Falha ao tentar criar simulação!');
    }
  }

  async findAll() {
    return await this.simulacaoRepository.findAll();
  }

  async findOne(id: string) {
    return await this.simulacaoRepository.findById(id);
  }
}
