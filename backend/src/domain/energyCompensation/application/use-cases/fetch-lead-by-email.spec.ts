import { FetchLeadByEmailUseCase } from './fetch-lead-by-email';
import { InMemoryLeadRepository } from '../../../../../test/repositories/in-memory-lead-repository';
import { makeLeadWithUnits } from '../../../../../test/factories/make-lead-with-units';

let inMemoryLeadRepository: InMemoryLeadRepository;
let sut: FetchLeadByEmailUseCase;

describe('Fetch lead by email', () => {
  beforeEach(() => {
    inMemoryLeadRepository = new InMemoryLeadRepository();
    sut = new FetchLeadByEmailUseCase(inMemoryLeadRepository);
  });

  it('should be able to fetch a lead by email', async () => {
    const fakeLead = makeLeadWithUnits({ email: 'pedro@example.com' });

    await inMemoryLeadRepository.create(fakeLead);

    const result = await sut.execute({ email: 'pedro@example.com' });

    expect(result.isRight()).toBe(true);
    expect(result.value.leadWithUnits.lead.email).toEqual('pedro@example.com');
  });

  it('should return null if lead does not exist', async () => {
    const result = await sut.execute({ email: 'pedro@example.com' });

    expect(result.isRight()).toBe(true);
    expect(result.isRight() && result.value.leadWithUnits).toBeNull();
  });
});
