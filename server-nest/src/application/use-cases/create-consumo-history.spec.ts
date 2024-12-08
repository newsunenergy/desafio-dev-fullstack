import { CreateConsumoHistoryUseCase } from './create-consumo-history';

describe('CreateConsumoHistoryUseCase', () => {
  it('should call consumoRepository.create', async () => {
    const consumoRepositoryMock = { create: jest.fn() };
    const createConsumoUseCase = new CreateConsumoHistoryUseCase(
      consumoRepositoryMock as any,
    );

    const history = {
      invoice: [
        {
          consumo_fp: 123123,
          consumo_date: '2022-12-01T09:00:00.000Z',
        },
      ],
      unidadeId: '79f13cd4-05f0-4c4b-a72d-c164a2ddf53a',
    };

    await createConsumoUseCase.execute(history);

    expect(consumoRepositoryMock.create).toHaveBeenCalled();
  });
});
