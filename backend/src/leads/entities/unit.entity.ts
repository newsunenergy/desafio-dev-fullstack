import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Unique,
  Index,
} from 'typeorm';
import { Lead } from './lead.entity';

export type ConsumptionHistory = {
  consumptionDate: Date;
  offPeakKwh: number;
  peakKwh: number;
};

@Entity({ name: 'units' })
@Unique(['codigoDaUnidadeConsumidora'])
@Index(['leadId'])
export class Unit {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  codigoDaUnidadeConsumidora: string;

  @Column('json')
  historicoDeConsumoEmKWH: ConsumptionHistory[];

  @Column('decimal', { precision: 12, scale: 2 })
  amount: number;

  @Column()
  barcode: string;

  @Column()
  chargingModel: string;

  @Column()
  phaseModel: string;

  @Column()
  energyCompanyId: string;

  @ManyToOne(() => Lead, (lead) => lead.units, { onDelete: 'CASCADE' })
  lead: Lead;

  @Column()
  leadId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
