import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateUnidadeDto } from './dto/create-unidade.dto';
import { UpdateUnidadeDto } from './dto/update-unidade.dto';
import { Unidade } from './entities/unidade.entity';

@Injectable()
export class UnidadeService {
  constructor(
    @InjectRepository(Unidade)
    private readonly unidadeRepository: Repository<Unidade>,
  ) {}

  private async findUnidadeOrFail(id: number): Promise<Unidade> {
    const unidade = await this.unidadeRepository.findOneBy({ id });
    if (!unidade) {
      throw new NotFoundException(`Unidade com id: ${id} não encontrado`);
    }
    return unidade;
  }

  async create(createUnidadeDto: CreateUnidadeDto): Promise<Unidade> {
    const unitCodeExists = await this.unidadeRepository.findOneBy({
      codigoDaUnidadeConsumidora: createUnidadeDto.codigoDaUnidadeConsumidora,
    });
    if (unitCodeExists !== null) {
      throw new HttpException(
        'Unidade consumidora já cadastrada no sistema',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (createUnidadeDto.historicoDeConsumoEmKWH.length < 12) {
      throw new HttpException(
        'A conta de energia enviada deve possuir os últimos 12 meses de consumo',
        HttpStatus.BAD_REQUEST,
      );
    }
    const unidade = this.unidadeRepository.create(createUnidadeDto);
    return await this.unidadeRepository.save(unidade);
  }

  findAll(): Promise<Unidade[]> {
    return this.unidadeRepository.find();
  }

  async findOne(id: number): Promise<Unidade> {
    return await this.findUnidadeOrFail(id);
  }

  async update(id: number, updateUnidadeDto: UpdateUnidadeDto) {
    await this.findUnidadeOrFail(id);
    return await this.unidadeRepository.update(id, updateUnidadeDto);
  }

  async remove(id: number): Promise<DeleteResult> {
    await this.findUnidadeOrFail(id);
    return await this.unidadeRepository.delete(id);
  }
}
