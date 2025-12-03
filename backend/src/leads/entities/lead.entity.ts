import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'leads' })
export class Lead {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column('decimal', { precision: 12, scale: 2, nullable: true })
  amount?: number;

  @Column({ nullable: true })
  barcode?: string;

  @Column({ nullable: true })
  chargingModel?: string;

  @Column({ nullable: true })
  phaseModel?: string;

  @Column({ nullable: true })
  unitKey?: string;

  @Column({ nullable: true })
  energyCompanyId?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
