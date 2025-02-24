import { FetchLeadsUseCase } from './fetch-leads';
import { InMemoryLeadRepository } from '../../../../../test/repositories/in-memory-lead-repository';
import { makeLeadWithUnits } from '../../../../../test/factories/make-lead-with-units';

let inMemoryLeadRepository: InMemoryLeadRepository;
let sut: FetchLeadsUseCase;

describe('Fetch Leads', () => {
  beforeEach(() => {
    inMemoryLeadRepository = new InMemoryLeadRepository();
    sut = new FetchLeadsUseCase(inMemoryLeadRepository);
  });

  it('should be able to fetch leads by partial name', async () => {
    const fakeLead = makeLeadWithUnits({ fullName: 'Pedro Furlan' });

    await inMemoryLeadRepository.create(fakeLead);

    const result = await sut.execute({ name: 'Ped' });

    expect(result.isRight()).toBe(true);
    expect(result.value.leadWithUnits.length).toBe(1);
    expect(result.value.leadWithUnits[0].lead.fullName).toBe('Pedro Furlan');
  });

  it('should be able to fetch leads by partial email', async () => {
    const fakeLead = makeLeadWithUnits({ email: 'pedro@example.com' });

    await inMemoryLeadRepository.create(fakeLead);

    const result = await sut.execute({ email: 'pedro@' });

    expect(result.isRight()).toBe(true);
    expect(result.value.leadWithUnits.length).toBe(1);
    expect(result.value.leadWithUnits[0].lead.email).toBe('pedro@example.com');
  });

  it('should be able to fetch leads by partial phone', async () => {
    const fakeLead = makeLeadWithUnits({ phone: '17987654321' });

    await inMemoryLeadRepository.create(fakeLead);

    const result = await sut.execute({ phone: '179876' });

    expect(result.isRight()).toBe(true);
    expect(result.value.leadWithUnits.length).toBe(1);
    expect(result.value.leadWithUnits[0].lead.phone).toBe('17987654321');
  });

  it('should return an empty array if no lead matches the filter', async () => {
    await inMemoryLeadRepository.create(
      makeLeadWithUnits({ fullName: 'Pedro Furlan' }),
    );

    const result = await sut.execute({ name: 'João' });

    expect(result.isRight()).toBe(true);
    expect(result.value.leadWithUnits).toEqual([]);
  });
});
