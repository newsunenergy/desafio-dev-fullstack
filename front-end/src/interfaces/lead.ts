import type { Unit } from "./unit";

export interface Lead {
	id: string;
	fullName: string;
	email: string;
	phoneNumber: string;
	units: Unit[];
}
