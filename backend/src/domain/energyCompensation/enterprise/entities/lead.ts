import { Optional } from '../../../../core/types/optional';
import { Entity } from '../../../../core/entities/entity';
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id';

export interface LeadProps {
  fullName: string;
  email: string;
  phone: string;
  updatedAt?: Date | null;
  createdAt: Date;
}

export class Lead extends Entity<LeadProps> {
  get fullName() {
    return this.props.fullName;
  }

  set name(newFullName: string) {
    this.props.fullName = newFullName;
    this.touch();
  }

  get email() {
    return this.props.email;
  }

  set email(email: string) {
    this.props.email = email;
    this.touch();
  }

  get phone() {
    return this.props.phone;
  }

  set phone(phone: string) {
    this.props.phone = phone;
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

  static create(props: Optional<LeadProps, 'createdAt'>, id?: UniqueEntityID) {
    const lead = new Lead(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );

    return lead;
  }
}
