import { Unidade } from 'src/unidade/entities/unidade.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Lead {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: 'varchar',
    length: 100,
  })
  nomeCompleto: string;

  @Column({
    unique: true,
    type: 'varchar',
    length: 50,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 20,
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
