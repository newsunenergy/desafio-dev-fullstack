import { FetchLeadByIdUseCase } from './fetch-lead-by-id';
import { InMemoryLeadRepository } from '../../../../../test/repositories/in-memory-lead-repository';
import { makeLeadWithUnits } from '../../../../../test/factories/make-lead-with-units';

let inMemoryLeadRepository: InMemoryLeadRepository;
let sut: FetchLeadByIdUseCase;

describe('Fetch lead by ID', () => {
  beforeEach(() => {
    inMemoryLeadRepository = new InMemoryLeadRepository();
    sut = new FetchLeadByIdUseCase(inMemoryLeadRepository);
  });

  it('should be able to fetch a lead by ID', async () => {
    const fakeLead = makeLeadWithUnits();
    await inMemoryLeadRepository.create(fakeLead);

    const result = await sut.execute({ id: fakeLead.lead.id.toString() });

    expect(result.isRight()).toBe(true);
    expect(
      result.isRight() && result.value.leadWithUnits.lead.id.toString(),
    ).toEqual(fakeLead.lead.id.toString());
  });

  it('should return null if lead does not exist', async () => {
    const result = await sut.execute({ id: '1234' });

    expect(result.isRight()).toBe(true);
    expect(result.isRight() && result.value.leadWithUnits).toBeNull();
  });
});
