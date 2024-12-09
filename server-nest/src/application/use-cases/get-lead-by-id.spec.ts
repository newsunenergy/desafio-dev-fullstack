import { GetLeadByIdUseCase } from './get-lead-by-id';
import { InMemoryRegisterSimulationRepository } from '@test/repositories/in-memory-register-simulation-repository';
import { Lead } from '@application/entities/lead';
import { NomeCompleto } from '@application/entities/lead-nome-completo';

describe('GetLeadByIdUseCase', () => {
  it('should be able to get a lead by its ID', async () => {
    const registerRepository = new InMemoryRegisterSimulationRepository();
    const getLeadById = new GetLeadByIdUseCase(registerRepository);

    const lead = new Lead({
      nomeCompleto: new NomeCompleto('Leandro Rodrigues'),
      telefone: '1199999999',
      email: 'leandro.rodrigues00@hotmail.com',
      unidades: [],
    });

    await registerRepository.create(lead);

    const result = await getLeadById.execute({ leadId: lead.id });

    expect(result.lead).toBeTruthy();
    expect(result.lead?.nomeCompleto.value).toBe('Leandro Rodrigues');
  });

  it('should return null if lead does not exist', async () => {
    const registerRepository = new InMemoryRegisterSimulationRepository();
    const getLeadById = new GetLeadByIdUseCase(registerRepository);

    const result = await getLeadById.execute({ leadId: 'non-existent-id' });

    expect(result.lead).toBeNull();
  });
});
