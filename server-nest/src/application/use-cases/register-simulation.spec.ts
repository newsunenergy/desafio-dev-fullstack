import { RegisterSimulation } from './register-simulation';
import { InMemoryRegisterSimulationRepository } from '@test/repositories/in-memory-register-simulation-repository';

describe('Register simulation', () => {
  it('should be able to register a simulation', async () => {
    const registerRepository = new InMemoryRegisterSimulationRepository();
    const registerSimulation = new RegisterSimulation(registerRepository);

    await registerSimulation.execute({
      name: 'Leandro Rodrigues',
      email: 'leandro.rodrigues00@hotmail.com',
      telefone: '1199999999',
      bills: [],
    });

    expect(registerRepository.leads).toHaveLength(1);
  });
});
