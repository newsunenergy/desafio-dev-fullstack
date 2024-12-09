import { Consumo } from './consumo';

describe('Consumo', () => {
  it('should be able to create a consumption', () => {
    const consumo = new Consumo({
      consumoForaPontaEmKWH: 7409,
      mesDoConsumo: '2022-05-01T09:00:00.000Z',
      unidadeId: 'ad6b40b2-c5ba-407a-b887-d26573c24a80',
    });

    expect(consumo).toBeTruthy();
  });
});
