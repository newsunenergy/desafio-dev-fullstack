import { UnitDto } from './unit.dto';

export class LeadResponseDto {
  id: string;
  name: string;
  email: string;
  phone: string;
  units: UnitDto[];
  createdAt: Date;
  updatedAt: Date;
}
