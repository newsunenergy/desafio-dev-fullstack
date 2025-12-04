export interface ILead {
    id: string;
    name: string;
    email: string;
    phone: string;
    createdAt: Date;
    units: IUnit[];
  }
  
  export interface IUnit {
    id: string;
    ConsumerUnitCode: string;
    modelPhasic: string;
    framing: string;
    leadId: string;
    consumptionhistory: IConsumptionHistory[];
  }
  
  export interface IConsumptionHistory {
    id: string;
    OffTipInKWH: number;
    monthOfConsumption: Date;
    unitId: string;
  }