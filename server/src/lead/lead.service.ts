import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EnergyBillService } from 'src/energy-bill/energy-bill.service';
import { DeleteResult, Repository } from 'typeorm';
import { CreateLeadDto } from './dto/create-lead.dto';
import { FindAllQueryDto } from './dto/find-all-query.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { Lead } from './entities/lead.entity';

@Injectable()
export class LeadService {
  constructor(
    @InjectRepository(Lead) private readonly leadRepository: Repository<Lead>,
    private readonly decodeEnergyBillService: EnergyBillService,
  ) {}

  private async findLeadOrFail(id: number): Promise<Lead> {
    const lead = await this.leadRepository.findOneBy({ id });
    if (!lead) {
      throw new NotFoundException(`Lead com id: ${id} não encontrado`);
    }
    return lead;
  }

  async create(
    createLeadDto: CreateLeadDto,
    informacoesDaFatura: Express.Multer.File[],
  ): Promise<Lead> {
    const leadEmailExists = await this.leadRepository.findOneBy({
      email: createLeadDto.email,
    });
    if (leadEmailExists !== null) {
      throw new HttpException(
        'E-mail do lead já está cadastrado',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (informacoesDaFatura.length === 0) {
      throw new HttpException(
        'Forneça uma conta de energia com 12 meses de consumo',
        HttpStatus.BAD_REQUEST,
      );
    }
    const unidades = await Promise.all(
      informacoesDaFatura.map(
        async (file) => await this.decodeEnergyBillService.decode(file),
      ),
    );
    const lead = this.leadRepository.create({ ...createLeadDto, unidades });
    return this.leadRepository.save(lead);
  }

  async findAll(query: FindAllQueryDto): Promise<Lead[]> {
    const { search } = query;
    const queryBuilder = this.leadRepository.createQueryBuilder('lead');
    if (search) {
      queryBuilder
        .orWhere('lead.nomeCompleto ILIKE :searchNome', {
          searchNome: `%${search}%`,
        })
        .orWhere('lead.email ILIKE :searchEmail', {
          searchEmail: `%${search}%`,
        })
        .orWhere('lead.telefone ILIKE :searchTelefone', {
          searchTelefone: `%${search}%`,
        });
    }
    return await queryBuilder.getMany();
  }

  findOne(id: number): Promise<Lead | null> {
    return this.findLeadOrFail(id);
  }

  update(id: number, updateLeadDto: UpdateLeadDto) {
    this.findLeadOrFail(id);
    return this.leadRepository.update(id, updateLeadDto);
  }

  remove(id: number): Promise<DeleteResult> {
    this.findLeadOrFail(id);
    return this.leadRepository.delete(id);
  }
}
