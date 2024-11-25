import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Unidade } from './Unidade';

@Entity()
export class Consumo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  consumoForaPontaEmKWH: number;

  @Column()
  mesDoConsumo: Date;

  @ManyToOne(() => Unidade, unidade => unidade.historicoDeConsumoEmKWH)
  unidade: Unidade;
}
