import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Lead } from './Lead';
import { Consumo } from './Consumo';

@Entity()
export class Unidade {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  codigoDaUnidadeConsumidora: string;

  @Column()
  modeloFasico: 'monofasico' | 'bifasico' | 'trifasico';

  @Column()
  enquadramento: string;

  @ManyToOne(() => Lead, lead => lead.unidades)
  lead: Lead;

  @OneToMany(() => Consumo, consumo => consumo.unidade, { cascade: true })
  historicoDeConsumoEmKWH: Consumo[];
}
