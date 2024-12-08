import { CreateUnidadeUseCase } from '@application/use-cases/create-unidade';

describe('Create Unidade', () => {
  it('should be able to create a unity', async () => {
    const unidadeRepositoryMock = { create: jest.fn() };

    const createUnidadeUseCase = new CreateUnidadeUseCase(
      unidadeRepositoryMock as any,
    );

    const processedData = {
      valor: 12,
      barcode: 'test-barcode',
      unit_key: '40418227',
      phaseModel: 'monofasico' as const,
      chargingModel: 'B3' as const,
      invoice: [
        {
          consumo_fp: 123123,
          consumo_date: '2022-12-01T09:00:00.000Z',
        },
      ],
      energy_company_id: 'teste-energy-id',
      leadId: '79f13cd4-05f0-4c4b-a72d-c164a2ddf53a',
    };

    await createUnidadeUseCase.execute(processedData);

    expect(unidadeRepositoryMock.create).toHaveBeenCalledWith(
      expect.objectContaining({
        codigoDaUnidadeConsumidora: '40418227',
        modeloFasico: 'monofasico',
        enquadramento: 'B3',
      }),
    );
  });
});
