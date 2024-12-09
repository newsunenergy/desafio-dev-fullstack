import { GetLeads } from './get-leads';
import { InMemoryRegisterSimulationRepository } from '@test/repositories/in-memory-register-simulation-repository';
import { Lead } from '@application/entities/lead';
import { NomeCompleto } from '@application/entities/lead-nome-completo';

describe('Get Leads', () => {
  it('should be able to get all leads', async () => {
    const registerRepository = new InMemoryRegisterSimulationRepository();
    const getLeads = new GetLeads(registerRepository);

    const lead1 = new Lead({
      nomeCompleto: new NomeCompleto('Leandro Rodrigues'),
      telefone: '1199999999',
      email: 'leandro.rodrigues00@hotmail.com',
      unidades: [],
    });

    const lead2 = new Lead({
      nomeCompleto: new NomeCompleto('João Silva'),
      telefone: '1198888888',
      email: 'joao.silva@hotmail.com',
      unidades: [],
    });

    await registerRepository.create(lead1);
    await registerRepository.create(lead2);

    const result = await getLeads.execute();

    expect(result.leads).toHaveLength(2);
    expect(result.leads[0].nomeCompleto.value).toBe('Leandro Rodrigues');
    expect(result.leads[1].nomeCompleto.value).toBe('João Silva');
  });
});
