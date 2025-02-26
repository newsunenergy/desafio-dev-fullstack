import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSimulacaoDto } from './dto/create-simulacao.dto';
import { UpdateSimulacaoDto } from './dto/update-simulacao.dto';
import { SimulacaoRepository } from './simulacao.repository';
import { processarContaPdf } from 'src/utils';
import { HistoricoConsumoDto, UnidadeDto } from './dto/unidade.dto';
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

        console.log('Dados Conta: ', dadosConta);

        const { unit_key, chargingModel, phaseModel, invoice } = dadosConta;
        const historicoDeConsumo: ConsumoDto[] = invoice.map((item) => ({
          consumoForaPontaEmKWH: item.consumo_fp,
          mesDoConsumo: new Date(item.consumo_date),
        }));
        const unidade = {
          codigoDaUnidadeConsumidora: unit_key,
          modeloFasico: phaseModel,
          enquadramento: chargingModel,
        } as UnidadeDto;

        await this.simulacaoRepository.create(
          createSimulacaoDto,
          unidade,
          historicoDeConsumo,
        );
      }
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Falha ao tentar criar simulação!');
    }
  }

  async findAll() {
    return await this.simulacaoRepository.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} simulacao`;
  }

  update(id: number, updateSimulacaoDto: UpdateSimulacaoDto) {
    return `This action updates a #${id} simulacao`;
  }

  remove(id: number) {
    return `This action removes a #${id} simulacao`;
  }
}
