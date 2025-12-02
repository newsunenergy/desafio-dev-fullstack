import { Optional } from '../../../../core/types/optional';
import { Entity } from '../../../../core/entities/entity';
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id';

export interface UnitProps {
  consumerUnitCode: string;
  framing: string;
  phaseModel: string;
  updatedAt?: Date | null;
  createdAt: Date;
}

export class Unit extends Entity<UnitProps> {
  get consumerUnitCode() {
    return this.props.consumerUnitCode;
  }

  set name(newConsumerUnitCode: string) {
    this.props.consumerUnitCode = newConsumerUnitCode;
    this.touch();
  }

  get framing() {
    return this.props.framing;
  }

  set framing(framing: string) {
    this.props.framing = framing;
    this.touch();
  }

  get phaseModel() {
    return this.props.phaseModel;
  }

  set phaseModel(phaseModel: string) {
    this.props.phaseModel = phaseModel;
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

  static create(props: Optional<UnitProps, 'createdAt'>, id?: UniqueEntityID) {
    const unit = new Unit(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );

    return unit;
  }
}
