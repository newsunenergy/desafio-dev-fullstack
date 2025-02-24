import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Unit } from './unit.entity';

@Entity('consumption')
export class Consumption {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column('float', { nullable: false })
	offPeakConsumptionInKWh: number;

	@Column('date', { nullable: false })
	consumptionMonth: Date;

	@ManyToOne(() => Unit, (unit) => unit.consumptionHistory, {
		onDelete: 'CASCADE',
		eager: false,
	})
	unit: Unit;
}
