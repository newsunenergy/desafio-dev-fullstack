import { Optional } from '../../../../core/types/optional';
import { Entity } from '../../../../core/entities/entity';
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id';

export interface ComsumptionProps {
  offPeakInKWH: number;
  comsuptiomMonth: number;
  unitId: string;
  updatedAt?: Date | null;
  createdAt: Date;
}

export class Comsumption extends Entity<ComsumptionProps> {
  get offPeakInKWH() {
    return this.props.offPeakInKWH;
  }

  set name(offPeakInKWH: number) {
    this.props.offPeakInKWH = offPeakInKWH;
    this.touch();
  }

  get comsuptiomMonth() {
    return this.props.comsuptiomMonth;
  }

  set comsuptiomMonth(comsuptiomMonth: number) {
    this.props.comsuptiomMonth = comsuptiomMonth;
    this.touch();
  }

  get unitId() {
    return this.props.unitId;
  }

  set unitId(unitId: string) {
    this.props.unitId = unitId;
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
    props: Optional<ComsumptionProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const comsumption = new Comsumption(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );

    return comsumption;
  }
}
