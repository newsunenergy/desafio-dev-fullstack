import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Unidade } from './Unidade';

@Entity()
export class Lead {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  nomeCompleto: string;

  @Column()
  telefone: string;

  @OneToMany(() => Unidade, unidade => unidade.lead, { cascade: true })
  unidades: Unidade[];
}
