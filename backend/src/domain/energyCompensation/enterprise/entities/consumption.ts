import { Optional } from '../../../../core/types/optional';
import { Entity } from '../../../../core/entities/entity';
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id';

export interface ConsumptionProps {
  offPeakInKWH: number;
  consumptionMonth: Date;
  updatedAt?: Date | null;
  createdAt: Date;
}

export class Consumption extends Entity<ConsumptionProps> {
  get offPeakInKWH() {
    return this.props.offPeakInKWH;
  }

  set name(offPeakInKWH: number) {
    this.props.offPeakInKWH = offPeakInKWH;
    this.touch();
  }

  get consumptionMonth() {
    return this.props.consumptionMonth;
  }

  set consumptionMonth(consumptionMonth: Date) {
    this.props.consumptionMonth = consumptionMonth;
    this.touch();
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  private touch() {
    this.props.updatedAt = new Date();
  }

  static create(
    props: Optional<ConsumptionProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const consumption = new Consumption(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );

    return consumption;
  }
}
