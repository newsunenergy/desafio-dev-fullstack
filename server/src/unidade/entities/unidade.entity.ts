import { Consumo } from 'src/consumo/entities/consumo.entity';
import { Lead } from 'src/lead/entities/lead.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Enquadramento } from './enum/enquadramento.enum';
import { ModeloFasico } from './enum/modelo-fasico.enum';

@Entity()
export class Unidade {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
    type: 'varchar',
    length: 50,
  })
  codigoDaUnidadeConsumidora: string;

  @Column({ type: 'enum', enum: ModeloFasico })
  modeloFasico: ModeloFasico;

  @Column({ type: 'enum', enum: Enquadramento })
  enquadramento: Enquadramento;

  @OneToMany(() => Consumo, (consumo) => consumo.unidade, {
    cascade: true,
    eager: true,
  })
  historicoDeConsumoEmKWH: Consumo[];

  @ManyToOne(() => Lead, (lead) => lead.unidades)
  lead: Lead;
}
