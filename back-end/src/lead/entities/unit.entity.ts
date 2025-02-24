import { Column, Entity, OneToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Consumption } from './consumption.entity';
import { Lead } from './lead.entity';

@Entity('unit')
export class Unit {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ nullable: false, unique: true })
	consumerUnitCode: string;

	@Column({ nullable: false })
	phaseModel: string;

	@Column({ nullable: false })
	chargingModel: string;

	@OneToMany(() => Consumption, (consumption) => consumption.unit, {
		cascade: true,
		eager: true
	})
	consumptionHistory: Consumption[];

	@ManyToOne(() => Lead, (lead) => lead.units, { onDelete: 'CASCADE' })
	lead: Lead;
}
