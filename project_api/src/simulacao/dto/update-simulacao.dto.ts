import { PartialType } from '@nestjs/mapped-types';
import { CreateSimulacaoDto } from './create-simulacao.dto';

export class UpdateSimulacaoDto extends PartialType(CreateSimulacaoDto) {}
