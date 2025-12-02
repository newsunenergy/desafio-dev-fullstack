import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  ForeignKey,
} from 'typeorm';
import { Unit } from './unit.entity';

@Entity('consumptions')
export class Consumption {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'double' })
  off_peak_consumption_kwh: number;

  @Column({ type: 'datetime' })
  consumption_month: Date;

  @ForeignKey(() => Unit)
  @Column({ type: 'varchar', length: 191 })
  unit_id: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => Unit, (unit) => unit.consumptions, { onDelete: 'CASCADE' })
  unit: Unit;
}
