import { Unidade } from 'src/unidade/entities/unidade.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique('UQ_lead_email', ['email'])
export class Lead {
  @PrimaryGeneratedColumn('increment', {
    primaryKeyConstraintName: 'PK_lead_id',
  })
  id: number;

  @Column({
    type: 'varchar',
    length: 100,
  })
  nomeCompleto: string;

  @Column({
    type: 'varchar',
    length: 50,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 30,
  })
  telefone: string;

  @OneToMany(() => Unidade, (unidade) => unidade.lead, {
    cascade: true,
    eager: true,
  })
  unidades: Unidade[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
