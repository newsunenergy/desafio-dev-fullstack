import { LeadWithUnitsDTO } from '../../../domain/energyCompensation/application/repositories/lead-repository';

export class LeadPresenter {
  static toHTTP(leadWithUnits: LeadWithUnitsDTO) {
    return {
      lead: {
        id: leadWithUnits.lead.id.toString(),
        fullName: leadWithUnits.lead.fullName,
        email: leadWithUnits.lead.email,
        phone: leadWithUnits.lead.phone,
        createdAt: leadWithUnits.lead.createdAt,
      },
      units: leadWithUnits.units.map((unitWithConsumptions) => ({
        unit: {
          consumerUnitCode: unitWithConsumptions.unit.consumerUnitCode,
          name: unitWithConsumptions.unit.name,
          framing: unitWithConsumptions.unit.framing,
          phaseModel: unitWithConsumptions.unit.phaseModel,
          createdAt: unitWithConsumptions.unit.createdAt,
        },
        consumptions: unitWithConsumptions.consumptions.map((consumption) => ({
          offPeakInKWH: consumption.offPeakInKWH,
          consumptionMonth: consumption.consumptionMonth,
        })),
      })),
    };
  }
}
