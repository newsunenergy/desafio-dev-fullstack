import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
import { Request } from 'express';

export const SortingPropertyParams = createParamDecorator(
  (validParams, ctx: ExecutionContext) => {
    const req: Request = ctx.switchToHttp().getRequest();

    let orderDirection = (req.query.orderDirection || 'asc') as string;
    let orderBy = req.query.orderBy as string;

    if (!orderBy) return;

    if (!Array.isArray(validParams))
      throw new BadRequestException(
        'Campos de ordenação válidos mal definidos',
      );

    if (!validParams.includes(orderBy))
      throw new BadRequestException('Campos de ordenação inválidos');

    let parsedOrderBy:
      | ParsedOrderBy
      | {
          [key: string]: ParsedOrderBy;
        };

    orderDirection = orderDirection.toLocaleLowerCase();
    const validDirections = ['asc', 'desc'];
    if (!validDirections.includes(orderDirection))
      throw new BadRequestException('Direção de ordenação inválida');

    if (orderBy.includes('.')) {
      const splittedOrderBy = orderBy.split('.');
      parsedOrderBy = {
        [splittedOrderBy[0]]: {
          [splittedOrderBy[1]]: orderDirection,
        },
      };
    } else {
      parsedOrderBy = {
        [orderBy]: orderDirection,
      };
    }

    return parsedOrderBy;
  },
);

type ParsedOrderBy = {
  [key: string]: string;
};
