import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  registerDecorator,
} from 'class-validator';

@ValidatorConstraint({ name: 'isModeloFasico', async: false })
export class IsModeloFasicoConstraint implements ValidatorConstraintInterface {
  validate(value: any) {
    return ['monofasico', 'bifasico', 'trifasico'].includes(
      value?.toLowerCase?.(),
    );
  }

  defaultMessage() {
    return 'modeloFasico deve ser: monofasico, bifasico ou trifasico';
  }
}

@ValidatorConstraint({ name: 'isEnquadramento', async: false })
export class IsEnquadramentoConstraint implements ValidatorConstraintInterface {
  validate(value: any) {
    return ['AX', 'B1', 'B2', 'B3'].includes(value?.toUpperCase?.());
  }

  defaultMessage() {
    return 'enquadramento deve ser: AX, B1, B2 ou B3';
  }
}

@ValidatorConstraint({ name: 'isHistorico12Meses', async: false })
export class IsHistorico12MesesConstraint implements ValidatorConstraintInterface {
  validate(historico: any[]) {
    return Array.isArray(historico) && historico.length === 12;
  }

  defaultMessage() {
    return 'O histórico de consumo deve conter exatamente 12 meses';
  }
}

// Decorators para usar no DTO
export function IsModeloFasico() {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      validator: IsModeloFasicoConstraint,
    });
  };
}

export function IsEnquadramento() {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      validator: IsEnquadramentoConstraint,
    });
  };
}

export function IsHistorico12Meses() {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      validator: IsHistorico12MesesConstraint,
    });
  };
}