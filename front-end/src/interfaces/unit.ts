import type { Consumption } from "./consumption";

export interface Unit {
	id: string;
	consumerUnitCode: string;
	phaseModel: string;
	chargingModel: string;
	consumptionHistory: Consumption[];
}
