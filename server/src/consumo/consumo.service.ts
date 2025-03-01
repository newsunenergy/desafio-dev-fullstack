import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateConsumoDto } from './dto/create-consumo.dto';
import { UpdateConsumoDto } from './dto/update-consumo.dto';
import { Consumo } from './entities/consumo.entity';

@Injectable()
export class ConsumoService {
  constructor(
    @InjectRepository(Consumo)
    private readonly consumoRepository: Repository<Consumo>,
  ) {}

  private async findConsumoOrFail(id: number): Promise<Consumo> {
    const consumo = await this.consumoRepository.findOneBy({ id });
    if (!consumo) {
      throw new NotFoundException(`Consumo com id: ${id} não encontrado`);
    }
    return consumo;
  }

  async create(createConsumoDto: CreateConsumoDto): Promise<Consumo> {
    const consumo = this.consumoRepository.create(createConsumoDto);
    return await this.consumoRepository.save(consumo);
  }

  findAll(): Promise<Consumo[]> {
    return this.consumoRepository.find();
  }

  findOne(id: number): Promise<Consumo> {
    return this.findConsumoOrFail(id);
  }

  async update(id: number, updateConsumoDto: UpdateConsumoDto) {
    this.findConsumoOrFail(id);
    return await this.consumoRepository.update(id, updateConsumoDto);
  }

  remove(id: number): Promise<DeleteResult> {
    this.findConsumoOrFail(id);
    return this.consumoRepository.delete(id);
  }
}
