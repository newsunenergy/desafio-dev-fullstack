import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  ForeignKey,
} from 'typeorm';
import { Lead } from './lead.entity';
import { Consumption } from './consumption.entity';

@Entity('units')
export class Unit {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 191, unique: true })
  consumer_unit_code: string;

  @Column({ type: 'varchar', length: 191 })
  phase_model: string;

  @Column({ type: 'varchar', length: 191 })
  framework: string;

  @ForeignKey(() => Lead)
  @Column({ type: 'varchar', length: 191 })
  lead_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Lead, (lead) => lead.units, { onDelete: 'CASCADE' })
  lead: Lead;

  @OneToMany(() => Consumption, (consumption) => consumption.unit, {
    cascade: true,
  })
  consumptions: Consumption[];
}
