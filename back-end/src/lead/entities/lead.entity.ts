import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Unit } from './unit.entity';

@Entity('lead')
export class Lead {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ nullable: false })
	fullName: string;

	@Column({ unique: true, nullable: false, length: 100 })
	email: string;

	@Column({ nullable: false, length: 20 })
	phoneNumber: string;

	@OneToMany(() => Unit, (unit) => unit.lead, {
		cascade: true,
		eager: true,
		onDelete: 'CASCADE'
	})
	units: Unit[];
}
